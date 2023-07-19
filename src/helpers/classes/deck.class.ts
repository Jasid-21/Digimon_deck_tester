import { Card } from "./card.class";
import { CardsArray } from "./cards_array.class";

export class Deck extends CardsArray {
  constructor() {
    super();
  }

  setDeck(cards: Card[]) {
    return this.updateCards(cards);
  }

  drawCard(): Card | undefined {
    return this.removeLast();
  }

  setProperties(own: boolean, card: Card) {
    card.hidden = true;
    card.place = 'deck';
    card.rested = false;
    card.faceDown = true;
  }
}
