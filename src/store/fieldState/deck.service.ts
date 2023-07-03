import { Injectable, Inject } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Card } from 'src/helpers/classes/card.class';

@Injectable()
export class DeckService {
  cards = new BehaviorSubject<Card[]>([]);

  constructor() {}

  setDeck(cards: Card[]) {
    this.cards.next(cards);
  }
}
