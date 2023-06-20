import { Injectable, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import { AlertsService } from './alerts.service';
import { BehaviorSubject } from 'rxjs';
import { Request, Room, codeDeck } from 'src/helpers/interfaces';
import { ModalsService } from './modals.service';

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
  ) { }

  connectSocket() {
    this.socket.connect();
    this.socket.on('connect', () => {
      this.refreshRooms();
    });

    this.socket.on('request_duel',
    (data) => {
      const { username, user_id } = data;
      this.requests.next([...this.requests.getValue(), { username, user_id }]);
    });

    this.socket.on('cancel_request', (user_id) => {
      this.requests.next(this.requests.getValue().filter((r) => r.user_id != user_id));
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
      this.modals.openHostModal(data.room_id, data.username);
    });
  }

  stopHosting() {
    this.socket.emit('stop_hosting', () => {
      this.refreshRooms();
    })
  }

  requestDuel(room_id: string, username: string) {
    this.socket.emit('request_duel', { room_id, username },
    (data: boolean) => {
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
}
