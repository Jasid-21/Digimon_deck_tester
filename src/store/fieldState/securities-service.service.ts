import { Injectable } from '@angular/core';
import { Card } from 'src/helpers/classes/card.class';
import { Security } from 'src/helpers/classes/security.class';
import { ZoneService } from '../store.interfaces';
import { Digimon } from 'src/helpers/classes/digimon.class';

@Injectable({
  providedIn: 'root'
})
export class SecuritiesServiceService implements ZoneService {
  securities: { own: boolean; security: Security }[] = [
    { own: true, security: new Security() },
    { own: false, security: new Security() },
  ];
  constructor() { }
  addCard(own: boolean, entity: Card | Digimon): void {
    throw new Error('Method not implemented.');
  }

  updateSecurity(own: boolean, cards: Card[]) {
    const security = this.findSecurity(own);
    if (!security) return;

    security.updateSecurity(cards);
  }

  switchLast(own: boolean) {
    const security = this.findSecurity(own);
    if (!security) return;

    security.switchLast();
  }

  removeLast(own: boolean): Card | undefined {
    const security = this.findSecurity(own);
    if (!security) return;

    return security.removeLast();
  }

  removeById(own: boolean, id: string): Card | undefined {
    const security = this.findSecurity(own);
    if (!security) return;

    return security.removeCardById(id);
  }

  addToLast(own: boolean, card: Card) {
    const security = this.findSecurity(own);
    if (!security) return;

    security.addCard(card);
  }

  findSecurity(own: boolean): Security | undefined {
    const security = this.securities.find((s) => s.own == own)?.security;
    return security;
  }
}
