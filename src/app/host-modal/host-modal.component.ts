import { Component } from '@angular/core';
import { ModalsService } from '../services/modals.service';
import { AlertsService } from '../services/alerts.service';
import { WebsocketService } from '../services/websocket.service';

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

  constructor(
    private modals: ModalsService,
    private alerts: AlertsService,
    private socket: WebsocketService,
  ) {}

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
