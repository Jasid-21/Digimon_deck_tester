import { Component, Input, OnInit } from '@angular/core';
import { DuelStateService } from 'src/store/fieldState/duelstate.service';
import { WebsocketService } from '../services/websocket.service';
import { random_code } from 'src/helpers/functions/random_code.function';
import { Digimon } from 'src/helpers/classes/digimon.class';

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

  digimon_list: Digimon[] = [];

  constructor(
    private duelstate: DuelStateService,
    private socket: WebsocketService,
  ) {};

  ngOnInit(): void {}

  allowDrop(event: DragEvent) {
    event.preventDefault();
  }

  dropCard(event: DragEvent) {
    const card = event.dataTransfer?.getData('card');
    console.log(card);
  }
}
