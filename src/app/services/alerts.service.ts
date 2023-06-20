import { Injectable } from '@angular/core';
import { AlertObject } from 'src/helpers/interfaces';
import * as Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor() { }

  fireAlert(swObj: AlertObject) {
    if (swObj.swal) {
      return Swal.default.fire({
        title: swObj.title || 'App service',
        text: swObj.content,
        icon: swObj.icon || 'info',
        showCancelButton: swObj.cancel || false,
      });
    } else {
      alert(swObj.content);
      return;
    }
  }
}
