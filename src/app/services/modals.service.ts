import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalsService {
  requestModal = new BehaviorSubject<boolean>(false);
  req_room_id: string = '';

  hostModal = new BehaviorSubject<boolean>(false);
  host_room_id = new BehaviorSubject<string>('');
  host_username = new BehaviorSubject<string>('');

  constructor() { }

  openRequestModal(room_id: string) {
    this.hostModal.next(false);
    this.requestModal.next(true);

    this.req_room_id = room_id;
  }

  openHostModal(room_id: string, username: string) {
    this.requestModal.next(false);

    this.hostModal.next(true);
    this.host_room_id.next(room_id);
    this.host_username.next(username);
  }

  closeModals() {
    this.requestModal.next(false);
    this.hostModal.next(false);
  }
}
