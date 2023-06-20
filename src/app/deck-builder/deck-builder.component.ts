import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { CardNumProp, RawCard, SavedRawDeck } from 'src/helpers/interfaces';
import { AppState } from 'src/store/app.state';
import { selectCards, selectCurrentCard, selectCurrentDeck} from 'src/store/cardsStore/cards.selectors';
import { CardStrProp } from 'src/helpers/interfaces';
import { SavedDecksService } from '../services/saved-decks.service';
import { addDeck, setRawDecks } from 'src/store/rawDecksStore/rawDecks.actions';
import { selectRawDecks } from 'src/store/rawDecksStore/rawDecks.selectors';
import { setCurrentDeck } from 'src/store/cardsStore/cards.actions';
import { AlertsService } from '../services/alerts.service';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-deck-builder',
  templateUrl: './deck-builder.component.html',
  styleUrls: ['./deck-builder.component.css']
})
export class DeckBuilderComponent {
  cards: RawCard[] = [];
  total_cards: RawCard[] = [];
  total_cards$ = this.store.pipe(select(selectCards))
  .subscribe((v) => {
    this.total_cards = v;
    this.applyFilter();
  });

  current_card: RawCard | null = null;
  current_card$ = this.store.pipe(select(selectCurrentCard))
  .subscribe((v) => { this.current_card = v; });

  deck: RawCard[] = [];
  deck$ = this.store.pipe(select(selectCurrentDeck))
  .subscribe((v) => {
    this.deck = [...v];
    this.deck.sort((a, b) => a.name.localeCompare(b.name))
  });

  saved_decks: SavedRawDeck[] = [];
  saved_decks$ = this.store.pipe(select(selectRawDecks))
  .subscribe((v) => {
    this.saved_decks = v;
  })

  faTrash = faTrashCan;
  byName: string = '';
  byColor: string = '';
  byType: string = '';

  byLevel: number | null = null;
  byPlay: number | null = null;
  byEvol: number | null = null;

  deck_name = '';
  chosen_deck = '';

  colors = ['blue', 'yellow', 'red', 'green', 'black', 'purple', 'white'];
  types = ['digimon', 'option', 'tamer', 'digi-egg', 'token'];

  constructor(
    private store: Store<AppState>,
    private decks_serv: SavedDecksService,
    private alerts: AlertsService,
  ) {}

  applyFilter(): void {
    this.cards = this.filter(this.total_cards);
  }

  resetParams(): void {
    this.byName = '';
    this.byColor = '';
    this.byType = '';
    this.byEvol = null;
    this.byLevel = null;
    this.byPlay = null;
  }

  filter(cards: RawCard[]): RawCard[] {
    const string_filer = (arr: RawCard[], prop: CardStrProp, ref: string) => {
      return arr.filter((c) => c[prop].toLowerCase().includes(ref.toLowerCase()));
    }

    const num_filter = (arr: RawCard[], prop: CardNumProp, ref: number) => {
      return arr.filter((c) => c[prop] == null || Number(c[prop]) == Number(ref));
    }


    const byName = this.byName?string_filer(cards, 'name', this.byName):cards;
    const byColor = this.byColor?string_filer(byName, 'color', this.byColor):byName;
    const byType = this.byType?string_filer(byColor, 'type', this.byType):byColor;

    const byLevel = this.byLevel?num_filter(byType, 'level', this.byLevel):byType;
    const byEvol = this.byEvol?num_filter(byType, 'evolution_cost', this.byEvol):byLevel;
    const byPlay = this.byPlay?num_filter(byEvol, 'play_cost', this.byPlay):byEvol;

    return byPlay;
  }

  loadDeck(): void {
    const chosen = this.saved_decks.find((sd) => sd.name == this.chosen_deck);
    if (!chosen) {
      this.alerts.fireAlert({
          swal: true,
          content: 'Deck not found',
          icon:'error'
        });
      return;
    }

    console.log(chosen);
    this.deck_name = chosen.name;
    this.store.dispatch(setCurrentDeck({ deck: chosen }));
  }

  saveDeck(): void {
    if (!this.deck_name) {
      this.alerts.fireAlert({
          swal: true,
          content: 'You need to provide a name',
          icon:'error'
        });
      return;
    }

    const deck = { name: this.deck_name, raw_deck: this.deck };
    this.store.dispatch(addDeck({ deck }));

    this.alerts.fireAlert(
      {
        swal: true,
        content: 'Successfully saved',
        icon: 'success'
      });
    setTimeout(() => {
      this.decks_serv.saveCodeDecks();
    }, 1000);
  }

  clearDeck(): void {
    const deck: SavedRawDeck = { name: this.deck_name, raw_deck: [] };
    this.store.dispatch(setCurrentDeck({ deck }));
  }

  deleteDeck(): void {
    if (!this.chosen_deck) return;

    const cfm = confirm(`Are you sure you want to delete the deck ${this.chosen_deck}?`);
    if (!cfm) return;

    const index = this.saved_decks.findIndex((sd) => sd.name == this.chosen_deck);
    if (index < 0) return;

    const decks = [...this.saved_decks]
    decks.splice(index, 1);

    this.store.dispatch(setRawDecks({ decks }));
    setTimeout(() => {
      this.decks_serv.saveCodeDecks();
      this.alerts.fireAlert(
        {
          swal: true,
          content: 'Deck successfully deleted!',
          icon:'success',
        });
    }, 300);
  }
}
