import { Component, Input } from '@angular/core';
import { RawCard } from 'src/helpers/interfaces';
import { Store } from '@ngrx/store';
import { AppState } from 'src/store/app.state';
import { removeFromDeck, setCurrentCard } from 'src/store/cardsStore/cards.actions';

@Component({
  selector: 'app-raw-card',
  templateUrl: './raw-card.component.html',
  styleUrls: ['./raw-card.component.css']
})
export class RawCardComponent {
  @Input() card!: RawCard;

  constructor(private store: Store<AppState>) {}

  setAsCurrent() {
    this.store.dispatch(setCurrentCard({ card: this.card }));
  }

  removeFromDeck(e: MouseEvent) {
    e.preventDefault();
    this.store.dispatch(removeFromDeck({ code: this.card.cardnumber }));
  }
}
