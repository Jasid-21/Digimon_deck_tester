import { Injectable, OnInit } from '@angular/core';
import { Card } from 'src/helpers/classes/card.class';
import { Hand } from 'src/helpers/classes/hand.class';
import { ZoneService } from '../store.interfaces';
import { Digimon } from 'src/helpers/classes/digimon.class';

@Injectable({
  providedIn: 'root'
})
export class HandsServiceService implements ZoneService {
  hands: { own: boolean; hand: Hand }[] = [
    { own: true, hand: new Hand() },
    { own: false, hand: new Hand() },
  ];

  constructor() {}
  addCard(own: boolean, card: Card): void {
    const hand = this.findHand(own);
    console.log(hand);
    if (!hand) return;

    hand.addToHand(own, card);
  }

  updateHand(own: boolean, cards: Card[]) {
    const hand = this.findHand(own);
    hand?.setCards(cards);
  }

  removeById(own: boolean, card_id: string): Card | undefined {
    const hand = this.findHand(own);
    if (!hand) return;

    return hand.removeCardById(card_id);
  }

  findHand(own: boolean): Hand | undefined {
    const hand = this.hands.find((h) => h.own == own)?.hand;
    return hand;
  }
}
