import { Injectable, OnInit } from '@angular/core';
import { Card } from 'src/helpers/classes/card.class';
import { Digimon } from 'src/helpers/classes/digimon.class';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DuelStateService implements OnInit {
  dueling = !true;
  room_id: string = '';
  decks$ = new BehaviorSubject<{ own: boolean; deck: Card[] }[]>([]);
  drops$ = new BehaviorSubject<{ own: boolean; drop: Card[] }[]>([]);
  hatch_downs$ = new BehaviorSubject<{ own: boolean; hatch_down: Card[] }[]>([]);
  hatch_ups$ = new BehaviorSubject<{ own: boolean; hatch_up: Digimon | null }[]>([]);
  hands$ = new BehaviorSubject<{ own: boolean; hand: Card[] }[]>([]);
  fields$ = new BehaviorSubject<{ own: boolean; field: Digimon[] }[]>([]);
  securities$ = new BehaviorSubject<{ own: boolean; security: Card[] }[]>([]);
  current_card = new BehaviorSubject<Card | null>(null);

  constructor() {}

  ngOnInit(): void {}

  setCurrentCard(card: Card) {
    this.current_card.next(card);
  }

  setPlayerState(own: boolean, deck: Card[], hatch: Card[], security: Card[]) {
    const prevDecks = this.decks$.getValue();
    const prevHatch = this.hatch_downs$.getValue();
    const prevSecurity = this.securities$.getValue();

    this.decks$.next([...prevDecks, { own, deck }]);
    this.hatch_downs$.next([...prevHatch, { own, hatch_down: hatch }]);
    this.securities$.next([...prevSecurity, { own, security }]);

    this.setAllDefault();
  }

  setAllDefault() {
    this.drops$.next([
      { own: true, drop: [] },
      { own: false, drop: [] },
    ]);

    this.hatch_ups$.next([
      { own: true, hatch_up: null },
      { own: false, hatch_up: null },
    ]);

    this.hands$.next([
      { own: true, hand: [] },
      { own: false, hand: [] },
    ]);

    this.fields$.next([
      { own: true, field: [] },
      { own: false, field: [] },
    ]);
  }

  handleUpdate(payload: { own: boolean; [key: string]: any }, place$: BehaviorSubject<any[]>) {
    const state = place$.getValue();

    const i = state.findIndex((v) => v.own == payload.own);
    if (i < 0) return;

    state.splice(i, 1, payload);
    place$.next(state);
  }
}
