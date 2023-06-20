import { Component } from '@angular/core';
import { ModalsService } from '../services/modals.service';
import { WebsocketService } from '../services/websocket.service';
import { Request } from 'src/helpers/interfaces';
import { AlertsService } from '../services/alerts.service';

@Component({
  selector: 'app-requests-modal',
  templateUrl: './requests-modal.component.html',
  styleUrls: ['./requests-modal.component.css']
})
export class RequestsModalComponent {
  show: boolean = false;
  show$ = this.modals.requestModal.subscribe((v) => {
    console.log(v);
    this.show = v;
  });

  constructor(
    private modals: ModalsService,
    private socket: WebsocketService,
    private alerts: AlertsService,
  ) {}

  closeModal() {
    this.alerts.fireAlert({
      swal: true,
      content: 'Are you sure you want to cancel the request?',
      cancel: true,
      icon: 'warning',
    })?.then((resp) => {
      if (resp.isConfirmed) {
        const room_id = this.modals.req_room_id;

        this.socket.cancelRequest(room_id);
        this.modals.closeModals();
      }
    });
  }
}
