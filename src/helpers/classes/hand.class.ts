import { Card } from "./card.class";

export class Hand {
  cards: Card[];

  constructor(cards: Card[]) {
    this.cards = cards;
  }

  setCards(cards: Card[]) {
    this.cards = cards;
  }
}
