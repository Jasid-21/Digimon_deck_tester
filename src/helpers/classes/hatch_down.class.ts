import { BehaviorSubject } from "rxjs";
import { Card } from "./card.class";
import { CardsArray } from "./cards_array.class";

export class HatchDown extends CardsArray {
  constructor() {
    super();
  }

  updateHatchDown(own: boolean, cards: Card[]): Card[] {
    cards.forEach((c) => this.setProperties(own, c));
    console.log(cards);
    return this.updateCards(cards);
  }

  setProperties(own: boolean, card: Card) {
    card.hidden = true;
    card.rested = false;
    card.faceDown = true;
    card.place = 'hatch_down';
  }
}
