import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { RawCard, SavedRawDeck, codeDeck } from 'src/helpers/interfaces';
import { AppState } from 'src/store/app.state';
import { selectCards } from 'src/store/cardsStore/cards.selectors';
import { selectRawDecks } from 'src/store/rawDecksStore/rawDecks.selectors';

@Injectable({
  providedIn: 'root'
})
export class SavedDecksService {
  cards: RawCard[] = [];
  cards$ = this.store.pipe(select(selectCards))
  .subscribe((v) => this.cards = v);

  raw_decks: SavedRawDeck[] = [];
  raw_decks$ = this.store.pipe(select(selectRawDecks))
  .subscribe((v) => this.raw_decks = v);

  constructor(private store: Store<AppState>) { }

  getCodeDecks(): codeDeck[] {
    const code_decks = localStorage.getItem('code_decks') || '[]';
    return JSON.parse(code_decks);
  }

  generateDeck(codes_deck: string[]): RawCard[] {
    const deck: RawCard[] = [];

    codes_deck.forEach((s) => {
      const card = this.cards.find((c) => c.cardnumber == s);
      if (!card) return;

      deck.push(card);
    });

    return deck;
  }

  saveCodeDecks() {
    const code_decks: codeDeck[] = [];
    this.raw_decks.forEach((rd) => {
      const cd = rd.raw_deck.map((c) => c.cardnumber);
      code_decks.push({ name: rd.name, code_deck: cd });
    });

    localStorage.setItem('code_decks', JSON.stringify(code_decks));
  }
}
