import { Component,  OnInit, ViewChild } from '@angular/core';
import { WebsocketService } from '../services/websocket.service';
import { Room, codeDeck, menuItem } from 'src/helpers/interfaces';
import { SavedDecksService } from '../services/saved-decks.service';
import { AlertsService } from '../services/alerts.service';
import { ModalsService } from '../services/modals.service';
import { RadialMenuComponent } from '../radial-menu/radial-menu.component';
import { faPlus, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {
  username: string = 'Player';
  chosen_deck: string = '';
  code_decks: codeDeck[] = [];
  chosen_room: string = '';

  rooms: Room[] = [];
  rooms$ = this.socket.rooms.subscribe((v) => {
    this.rooms = v;
  });

  constructor(
    private socket: WebsocketService,
    private decksServ: SavedDecksService,
    private alerts: AlertsService,
    private modals: ModalsService,
  ) {}

  ngOnInit(): void {
    this.socket.connectSocket();
    this.code_decks = this.decksServ.getCodeDecks();
  }

  startFakeDuel() {
    const code_deck = this.decksServ.getCodeDecks()[0].code_deck;
    this.socket.startFakeDuel(code_deck);
  }

  refreshRooms() {
    this.socket.refreshRooms();
  }

  choseRoom(id: string) {
    this.chosen_room = id;
  }

  requestDuel() {
    if (!this.chosen_room) return;
    if (!this.username || !this.chosen_deck) {
      this.alerts.fireAlert({
        swal: true,
        content: 'You need to povide a username and a deck before request a duel...',
        icon: 'error',
      });
      return;
    }

    const deck = this.code_decks.find((d) => d.name == this.chosen_deck);
    if (!deck) {
      this.alerts.fireAlert({
        swal: true,
        content: 'Error with your saved decks...',
        icon: 'error',
      });

      return;
    }
    this.socket.requestDuel(this.chosen_room, this.username, deck.code_deck);
  }

  hostRoom() {
    if (!this.username || !this.chosen_deck) {
      this.alerts.fireAlert({
        swal: true,
        content: 'You need to provide a username and choose a deck before hosting a room...',
        icon: 'error',
      });
      return;
    }

    const deck = this.code_decks.find((d) => d.name == this.chosen_deck);
    if (!deck) {
      this.alerts.fireAlert({
        swal: true,
        content: 'Deck not found...',
        icon: 'error',
      });
      return;
    }
    this.socket.hostRoom(this.username, deck);
  }
}
