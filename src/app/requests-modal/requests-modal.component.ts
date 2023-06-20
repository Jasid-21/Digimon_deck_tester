import { Component } from '@angular/core';
import { ModalsService } from '../services/modals.service';

@Component({
  selector: 'app-requests-modal',
  templateUrl: './requests-modal.component.html',
  styleUrls: ['./requests-modal.component.css']
})
export class RequestsModalComponent {
  show: boolean = false;
  show$ = this.modals.requestModal.subscribe((v) => {
    this.show = v;
  });

  constructor(private modals: ModalsService) {}

  closeModal() {
    this.modals.closeModals();
  }
}
