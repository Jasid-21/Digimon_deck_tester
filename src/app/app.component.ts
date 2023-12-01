import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { SavedDecksService } from './services/saved-decks.service';
import { RawCard, SavedRawDeck, codeDeck } from 'src/helpers/interfaces';
import { AppState } from 'src/store/app.state';
import { setRawDecks } from 'src/store/rawDecksStore/rawDecks.actions';
import { selectCards } from 'src/store/cardsStore/cards.selectors';
import { setBuilderCards } from 'src/store/cardsStore/cards.actions';
import j_database from 'src/json/database.json';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  code_decks: codeDeck[] = [];

  cards$ = this.store.pipe(select(selectCards))
  .subscribe((v) => {
    const decks: SavedRawDeck[] = [];
      for (let d of this.code_decks) {
        const deck = this.decks_serv.generateDeck(d.code_deck);
        decks.push({ name: d.name, raw_deck: deck });
      }

      this.store.dispatch(setRawDecks({ decks }));
  });

  constructor(
    private decks_serv: SavedDecksService,
    private store: Store<AppState>,
    ) {}

  async ngOnInit() {
    this.code_decks = this.decks_serv.getCodeDecks();

    /*
    const url = `${environment.apiUrl}deck-builder`;
    const resp = await fetch(url);
    const json = await resp.json();
    */
   const json: RawCard[] = j_database;

    this.store.dispatch(setBuilderCards({ cards: json }));
  }
}
