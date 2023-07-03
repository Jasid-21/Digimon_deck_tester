import { Component, Input, OnInit } from '@angular/core';
import { DuelStateService } from 'src/store/fieldState/duelstate.service';
import { WebsocketService } from '../services/websocket.service';

@Component({
  selector: 'app-field-side',
  templateUrl: './field-side.component.html',
  styleUrls: ['./field-side.component.css']
})
export class FieldSideComponent implements OnInit {
  @Input() own!: boolean;

  constructor(
    private duelstate: DuelStateService,
    private socket: WebsocketService,
  ) {};

  ngOnInit(): void {}
}
