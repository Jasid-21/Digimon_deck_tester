import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { AlertsService } from './alerts.service';
import { BehaviorSubject } from 'rxjs';
import { Room, codeDeck } from 'src/helpers/interfaces';
import { ModalsService } from './modals.service';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  socket = io.io(`http://localhost:3001`);
  rooms = new BehaviorSubject<Room[]>([]);

  constructor(
    private alerts: AlertsService,
    private modals: ModalsService,
  ) { }

  connectSocket() {
    this.socket.connect();
    this.socket.on('connect', () => {
      this.refreshRooms();
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
}
