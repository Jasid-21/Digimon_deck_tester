import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { AlertsService } from './alerts.service';
import { BehaviorSubject } from 'rxjs';
import {
  CardInterface,
  MoveCardPlaceContent,
  PlacesType, RawCard,
  Request,
  Room,
  codeDeck,
} from 'src/helpers/interfaces';
import { ModalsService } from './modals.service';
import { Router } from '@angular/router';
import { DuelStateService } from 'src/store/fieldState/duelstate.service';
import { Card } from 'src/helpers/classes/card.class';
import { duelListeners } from 'src/helpers/functions/socketListeners.function';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  socket = io.io(`http://localhost:3001`);
  rooms = new BehaviorSubject<Room[]>([]);
  requests = new BehaviorSubject<Request[]>([]);

  constructor(
    private alerts: AlertsService,
    private modals: ModalsService,
    private router: Router,
    private duelstate: DuelStateService,
  ) { }

  connectSocket() {
    this.socket.connect();
    this.socket.on('connect', () => {
      this.refreshRooms();
    });

    this.socket.on('request_duel',
    (data) => {
      console.log(data);
      const { username, user_id, deck } = data;
      this.requests.next([...this.requests.getValue(), { username, user_id, deck }]);
    });

    this.socket.on('dismis_request', () => {
      this.alerts.fireAlert({
        swal: true,
        content: 'User is no longer hosting this room',
      })
      this.modals.closeModals();
      this.refreshRooms()
    });

    this.socket.on('cancel_request', (user_id) => {
      this.requests.next(this.requests.getValue().filter((r) => r.user_id != user_id));
    });

    this.socket.on('start_duel', (data: { players: any[], room_id: string }) => {
      const t = data.players.map((p) => {
        const deck: Card[] = p.deck.map((c: CardInterface) => new Card(c));
        const hatch: Card[] = p.hatch_down.map((c: CardInterface) => new Card(c));
        const security: Card[] = p.security.map((c: CardInterface) => new Card(c));
        const own: boolean = p.player_id == this.socket.id;
        return { deck, hatch, security, own};
      });

      t.forEach((el) => {
        console.log(el.deck);
        this.duelstate.setPlayerState(el.own, el.deck, el.hatch);
      });

      this.duelstate.dueling = true;
      this.duelstate.room_id = data.room_id;
      this.router.navigate(['duel']);
    });

    duelListeners(this.socket, this.duelstate);
  }

  startFakeDuel(code_deck: string[]) {
    this.socket.emit('fake_duel', { code_deck }, (resp: any) => {
      if (!resp.resp) console.log("Error");
    });
  }

  refreshRooms() {
    this.socket.emit('refresh_rooms', (data: Room[]) => {
      console.log(data);
      this.rooms.next(data);
    });
  }

  hostRoom(username: string, code_deck: codeDeck) {
    this.socket.emit('host_room', { username, code_deck },
    (data: any) => {
      console.log(data);
      this.modals.openHostModal(data.resp.id, data.resp.player);
    });
  }

  stopHosting(requests: string[]) {
    this.socket.emit('stop_hosting', requests, () => {
      this.refreshRooms();
    })
  }

  requestDuel(room_id: string, username: string, code_deck: string[]) {
    this.socket.emit('request_duel', { room_id, username, code_deck },
    (data: any) => {
      console.log(data);
      if (!data) {
        this.alerts.fireAlert({
          swal: true,
          content: 'Error requesting duel',
          icon: 'error',
        });
        return;
      }

      this.modals.openRequestModal(room_id);
    });
  }

  cancelRequest(room_id: string) {
    this.socket.emit('cancel_request', room_id);
  }

  startDuel(room_id: string, op_id: string, op_name: string, op_deck: RawCard[]) {
    const toTransfer = { room_id, op_id, op_name, op_deck };
    this.socket.emit('start_duel', toTransfer, (data: any) => {
      console.log(data);
      if (data) {
        this.alerts.fireAlert({
          swal: true,
          content: data.errMsg,
          icon: 'error',
        });
        return;
      }
    });
  }

  //* Duel emiter section
  drawCard() {
    this.socket.emit('draw-card',
      { player_id: this.socket.id, room_id: this.duelstate.room_id }
    );
  }

  hatchDigimon() {
    this.socket.emit('hatch',
      { room_id: this.duelstate.room_id }
    );
  }

  moveCard(card_id: string, origin: string, destiny: PlacesType, x?: number, y?: number) {
    this.socket.emit('move-card', {
      room_id: this.duelstate.room_id,
      card_id, origin, destiny, x, y,
    });
  }

  revealTopDeck() {
    this.socket.emit('reveal-top-deck',
      { room_id: this.duelstate.room_id }
    );
  }
}
