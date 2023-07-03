import { Component, Input } from '@angular/core';
import { Card } from 'src/helpers/classes/card.class';
import { DuelStateService } from 'src/store/fieldState/duelstate.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() card!: Card;

  constructor(
    private duelState: DuelStateService,
  ) {}

  setAsCurrent() {
    if (this.card.hidden) return;
    this.duelState.setCurrentCard(this.card);
  }
}
