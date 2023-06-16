import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { CardsState } from "../store.interfaces";

const selectCardsState = (state: AppState) => state.cards;

const selectCards = createSelector(
  selectCardsState,
  (state: CardsState) => state.cards_store
);

const selectCurrentCard = createSelector(
  selectCardsState,
  (state: CardsState) => state.current_card
);

const selectCurrentDeck = createSelector(
  selectCardsState,
  (state: CardsState) => state.deck
);

export { selectCards, selectCurrentCard, selectCurrentDeck };
