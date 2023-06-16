import { CardInterface, PlacesType } from "./interfaces";
import { shuffleArray } from "./functions";

class Card implements CardInterface {
  id: string;
  imgUrl: string;
  hidden: boolean;
  rested: boolean;
  faceDown: boolean;
  place: PlacesType;
  player: string;

  constructor(id: string, imgUrl: string, place: PlacesType, player: string) {
    this.id = id;
    this.imgUrl = imgUrl;
    this.place = place;
    this.player = player;
    this.hidden = true;
    this.rested = false;
    this.faceDown = true;
  }

  flip(): void {
    this.faceDown = !this.faceDown;
  }

  rotate(): void {
    this.rested = !this.rested;
  }
}

class CardsArray {
  name: PlacesType;
  cards: Card[] = [];

  constructor(cards: Card[], name: PlacesType) {
    this.name = name;
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

class Deck extends CardsArray {
  constructor(cards: Card[]) {
    super(cards, 'deck');
  }

  draw(): Card {
    return this.cards.splice(0, 1)[0];
  }

  shuffleDeck(): void {
    this.cards = shuffleArray(this.cards);
  }
}

class Digimon extends CardsArray {
  place: PlacesType;
  constructor(stages: Card[], place: PlacesType) {
    super(stages, 'digimon');
    this.place = place;
  }

  deEvolve(): Card | void {
    return this.cards.pop();
  }
}

class Hand extends CardsArray {
  constructor(cards: Card[]) {
    super(cards, 'hand');
  }

  revealHand(): void {
    this.cards.map(c => c.faceDown = false);
  }

  hideHand(): void {
    this.cards.map(c => c.faceDown = true);
  }
}

class Drop extends CardsArray {
  constructor(cards: Card[]) {
    super(cards, 'drop');
  }
}

class HatchUp {
  name: PlacesType = 'hatch_up';
  digimon: Digimon;
  constructor(digimon: Digimon) {
    this.digimon = digimon;
  }
}

class HatchDown extends CardsArray {
  constructor(cards: Card[]) {
    super(cards, 'hatch_down');
  }

  takeFirst(): Card {
    return this.cards.splice(0, 1)[0];
  }
}

class Security extends CardsArray {
  constructor(cards: Card[]) {
    super(cards, 'security');
  }
}

export { Card, Deck, Digimon, Hand, Drop, HatchUp, HatchDown, Security };
