import { Component, Input, OnInit } from '@angular/core';
import { DuelStateService } from 'src/store/fieldState/duelstate.service';
import { WebsocketService } from '../services/websocket.service';
import { random_code } from 'src/helpers/functions/random_code.function';
import { Digimon } from 'src/helpers/classes/digimon.class';
import { FieldsServiceService } from 'src/store/fieldState/fields-service.service';
import { PlacesType } from 'src/helpers/interfaces';

@Component({
  selector: 'app-field-side',
  templateUrl: './field-side.component.html',
  styleUrls: ['./field-side.component.css']
})
export class FieldSideComponent implements OnInit {
  @Input() own!: boolean;
  deck_id = random_code(6);
  drop_id = random_code(6);
  hand_id = random_code(6);
  hatch_id = random_code(6);
  security_id = random_code(6);
  highlight = false;

  digimons: Digimon[] = [];

  constructor(
    private socket: WebsocketService,
    private fieldsService: FieldsServiceService,
  ) {};

  ngOnInit(): void {
    this.fieldsService.findField(this.own)?.digimons.subscribe((v) => this.digimons = v);
  }

  allowDrop(event: DragEvent) {
    event.preventDefault();
  }

  dropCard(event: DragEvent) {
    const card_id = event.dataTransfer?.getData('card_id');
    const card_place = event.dataTransfer?.getData('card_place');
    if (!card_id || !card_place) return;

    const x = event.offsetX;
    const y = event.offsetY

    this.socket.moveCard(card_id, card_place, 'field', x, y);
  }
}
