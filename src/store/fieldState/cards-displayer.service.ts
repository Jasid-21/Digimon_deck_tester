import { Injectable, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Card } from 'src/helpers/classes/card.class';

@Injectable({
  providedIn: 'root'
})
export class CardsDisplayerService {
  cards$ = new BehaviorSubject<Card[]>([]);

  constructor() { }

  addCard(card: Card): void {
    const current = this.cards$.value;
    this.setDisplayerProperties([card]);
    current.push(card);
    this.cards$.next(current);
  }

  resetCards(): Card[] {
    console.log("reseting cards");
    const current = { ...this.cards$.value };
    this.cards$.next([]);
    return current;
  }

  setDisplayerProperties(cards: Card[]): void {
    cards.forEach((c) => c.hidden = false);
  }
}
