import { Component, Input, OnInit } from '@angular/core';
import { Card } from 'src/helpers/classes/card.class';
import { Hand } from 'src/helpers/classes/hand.class';
import { DuelStateService } from 'src/store/fieldState/duelstate.service';
import { HandsServiceService } from 'src/store/fieldState/hands-service.service';
import { WebsocketService } from '../services/websocket.service';

@Component({
  selector: 'app-hand',
  templateUrl: './hand.component.html',
  styleUrls: ['./hand.component.css']
})
export class HandComponent implements OnInit {
  @Input() id!: string;
  @Input() own!: boolean;

  cards: Card[] = [];

  constructor(
    private handsService: HandsServiceService,
    private socketService: WebsocketService,
  ) {}

  ngOnInit(): void {
    this.handsService.findHand(this.own)?.cards$.subscribe((v) => this.cards = v) ;
  }
}
