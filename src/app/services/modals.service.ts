import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalsService {
  requestModal = new BehaviorSubject<boolean>(false);

  hostModal = new BehaviorSubject<boolean>(false);
  room_id: string = '';
  username: string = '';

  constructor() { }

  openRequestModal() {
    this.hostModal.next(false);
    this.requestModal.next(true);
  }

  openHostModal(room_id: string, username: string) {
    this.requestModal.next(false);

    this.hostModal.next(true);
    this.room_id = room_id;
    this.username = username;
  }

  closeModals() {
    this.requestModal.next(false);
    this.hostModal.next(false);
  }
}
