import { Component, Input, OnInit } from '@angular/core';
import { Hand } from 'src/helpers/classes/hand.class';
import { DuelStateService } from 'src/store/fieldState/duelstate.service';

@Component({
  selector: 'app-hand',
  templateUrl: './hand.component.html',
  styleUrls: ['./hand.component.css']
})
export class HandComponent implements OnInit {
  @Input() id!: string;
  @Input() own!: boolean;

  hand: Hand = new Hand([]);

  constructor(
    private duelState: DuelStateService,
  ) {}

  ngOnInit(): void {
    this.duelState.hands$.subscribe((v) => {
      const hand = v.find((h) => h.own == this.own);
      console.log(hand);
      if (!hand) return;

      if (hand.own) {
        hand.hand.forEach((c) => c.hidden = false);
      } else {
        hand.hand.forEach((c) => c.hidden = true);
      }

      this.hand.setCards(hand.hand);
    });
  }
}
