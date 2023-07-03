import { PlacesType } from "../interfaces";
import { Card } from "./card.class";

export class CardsArray {
  name: PlacesType;
  cards: Card[] = [];

  constructor(cards: Card[], name: PlacesType) {
    this.name = name;
    this.cards = cards;
  }

  setCards(cards: Card[]) {
    this.cards = cards;
  }

  addToLast(card: Card, faceDown: boolean): void {
    card.faceDown = faceDown;
    this.cards.push(card);
  }

  addToStart(card: Card): void {
    this.cards.splice(0, 0, card);
  }

  removeById(id: string): Card | void {
    const index = this.cards.findIndex(c => c.id == id);
    if (index <= 0) return;
    return this.cards.splice(index, 1)[0];
  }
}
