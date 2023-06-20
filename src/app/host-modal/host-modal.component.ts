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

  chosen_req: string = '';

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
        this.socket.stopHosting();
        this.modals.closeModals();
      }
    });
  }
}
