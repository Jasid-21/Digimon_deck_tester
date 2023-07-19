import { BehaviorSubject } from "rxjs";
import { Card } from "./card.class";
import { CardsArray } from "./cards_array.class";

export class Hand extends CardsArray {
  constructor() {
    super();
  }

  setCards(cards: Card[]) {
    this.cards$.next(cards);
    return this.cards$.value;
  }

  addToHand(own: boolean, card: Card): Card[] {
    this.setProperties(own, card);
    return this.addCard(card);
  }

  setProperties(own: boolean, card: Card) {
    card.hidden = !own;
    card.place = 'hand';
    card.rested = false;
    card.faceDown = false;
  }
}
