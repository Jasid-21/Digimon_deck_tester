import { BehaviorSubject } from "rxjs";
import { Card } from "./card.class";

export class Deck {
  cards: Card[] = [];
  test: boolean = false;

  setDeck(cards: Card[]) {
    //this.cards$.next(cards);
    this.cards = cards;
  }
}
