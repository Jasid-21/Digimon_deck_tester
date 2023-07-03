import { Component } from '@angular/core';
import { ModalsService } from '../services/modals.service';
import { AlertsService } from '../services/alerts.service';
import { WebsocketService } from '../services/websocket.service';
import { Request } from 'src/helpers/interfaces';

@Component({
  selector: 'app-host-modal',
  templateUrl: './host-modal.component.html',
  styleUrls: ['./host-modal.component.css']
})
export class HostModalComponent {
  show: boolean = false;
  show$ = this.modals.hostModal.subscribe((v) => {
    this.show = v;
  });

  requests: Request[] = [];
  requests$ = this.socket.requests.subscribe((v) => {
    this.requests = v;
  });

  room_id = '';
  room_id$ = this.modals.host_room_id.subscribe((v) => this.room_id = v);

  username = '';
  username$ = this.modals.host_username.subscribe((v) => this.username = v);

  chosen_req = '';

  constructor(
    private modals: ModalsService,
    private alerts: AlertsService,
    private socket: WebsocketService,
  ) {}

  choseRequest(id: string) {
    this.chosen_req = id;
  }

  closeModal() {
    this.alerts.fireAlert({
      swal: true,
      content: 'Are you sure you want to stop hosting?',
      cancel: true,
      icon: 'warning',
    })?.then((resp) => {
      if (resp.isConfirmed) {
        const req_list = this.requests.map((r) => r.user_id);
        this.socket.stopHosting(req_list);
        this.modals.closeModals();
      }
    });
  }

  acceptDuel() {
    const op = this.requests.find((p) => p.user_id == this.chosen_req);
    if (!op) return;
    this.socket.startDuel(this.room_id, this.chosen_req, op.username, op.deck);
  }
}
