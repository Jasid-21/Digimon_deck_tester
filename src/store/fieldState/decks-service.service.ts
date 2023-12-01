import { Injectable, OnInit } from '@angular/core';
import { Card } from 'src/helpers/classes/card.class';
import { Deck } from 'src/helpers/classes/deck.class';
import { ZoneService } from '../store.interfaces';
import { Digimon } from 'src/helpers/classes/digimon.class';

@Injectable({
  providedIn: 'root'
})
export class DecksServiceService implements ZoneService {
  decks: { own: boolean; deck: Deck }[] = [
    { own: true, deck: new Deck() },
    { own: false, deck: new Deck() },
  ];

  constructor() { }
  removeById(own: boolean, id: string): Card | undefined {
    const deck = this.findDeck(own);
    if (!deck) return;

    return deck.removeCardById(id);
  }

  addCard(own: boolean, entity: Card | Digimon): Card[] | undefined {
    const deck = this.findDeck(own);
    if (!deck) return;

    if (entity instanceof Card) {
      this.setDeckProperties([entity]);
      deck.addCard(entity);
      return;
    }

    const card = entity.stages.pop();
    if (!card) return;

    this.setDeckProperties([card]);
    deck.addCard(card);
    return entity.stages;
  }

  addToBottom(own: boolean, cards: Card[]): void {
    const deck = this.findDeck(own);
    if (!deck) return;

    cards.forEach((c) => {
      deck.addCard(c, true);
    });
  }

  updateDeck(own: boolean, cards: Card[]) {
    this.setDeckProperties(cards);
    const deck = this.decks.find((d) => d.own == own)?.deck;
    deck?.setDeck(cards);
  }

  drawCard(own: boolean): Card | undefined {
    const deck = this.decks.find((d) => d.own == own)?.deck;
    const card = deck?.drawCard();
    return card;
  }

  findDeck(own: boolean): Deck | undefined {
    const deck = this.decks.find((d) => d.own == own)?.deck;
    return deck;
  }

  setDeckProperties(cards: Card[]): void {
    cards.forEach((c) => {
      c.place = 'deck';
      c.rested = false;
      c.faceDown = true;
    });
  }
}
