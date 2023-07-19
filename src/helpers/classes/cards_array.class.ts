import { BehaviorSubject } from "rxjs";
import { PlacesType } from "../interfaces";
import { Card } from "./card.class";

export class CardsArray {
  cards$ = new BehaviorSubject<Card[]>([]);

  updateCards(cards: Card[]) {
    this.cards$.next(cards);
    return this.cards$.value;
  }

  removeLast(): Card | undefined {
    const current = this.cards$.value;
    const card = current.pop();
    if (!card) return;

    this.cards$.next(current);
    return card;
  }

  addCard(card: Card): Card[] {
    const current = this.cards$.value;
    this.cards$.next([...current, card]);

    return this.cards$.value;
  }

  findCardById(id: string): Card | undefined {
    const current = this.cards$.value;
    return current.find((c) => c.id == id);
  }

  removeCardById(id: string): Card | undefined {
    const current = this.cards$.value;
    const index = current.findIndex((c) => c.id == id);
    if (index < 0) return;

    const card = current.splice(index, 1);
    this.cards$.next(current);
    return card[0];
  }
}
