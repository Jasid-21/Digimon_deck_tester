import { Injectable } from '@angular/core';
import { Card } from 'src/helpers/classes/card.class';
import { Digimon } from 'src/helpers/classes/digimon.class';
import { PlacesType } from 'src/helpers/interfaces';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class DragDropService {
  element: Card | Digimon | null = null;
  destiny: PlacesType | null = null;

  constructor(private socket: WebsocketService) {}

  setElement(el: Card | Digimon) {
    this.element = el;
  }

  setDestiny(dest: PlacesType) {
    this.destiny = dest;
  }

  resetService() {
    this.element = null;
    this.destiny = null;
  }
}
