import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { RawCard } from 'src/helpers/interfaces';
import { AppState } from 'src/store/app.state';
import { addToDeck, setCurrentCard } from 'src/store/cardsStore/cards.actions';

@Component({
  selector: 'app-card-result-item',
  templateUrl: './card-result-item.component.html',
  styleUrls: ['./card-result-item.component.css']
})
export class CardResultItemComponent {
  @Input() card!: RawCard;

  constructor(private store: Store<AppState>) {}

  setAsCurrent() {
    this.store.dispatch(setCurrentCard({ card: this.card }));
  }

  addToDeck(e: MouseEvent) {
    e.preventDefault();
    this.store.dispatch(addToDeck({ card: this.card }));
  }
}
