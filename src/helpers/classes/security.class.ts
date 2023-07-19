import { Card } from "./card.class";
import { CardsArray } from "./cards_array.class";

export class Security extends CardsArray {
  constructor() {
    super();
  }

  updateSecurity(cards: Card[]): Card[] {
    return this.updateCards(cards);
  }

  switchLast(): void {
    const cards = this.cards$.value;
    const l = cards.length;
    if (l < 1) return;

    const card = cards[l - 1];
    card.hidden = !card.hidden;
    card.faceDown = !card.faceDown;
  }

  setProperties(card: Card) {
    card.hidden = true;
    card.rested = false;
    card.faceDown = true;
    card.place = 'security';
  }
}
