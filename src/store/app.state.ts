import { CardsState, FieldState, RawDecksState } from "./store.interfaces";

export interface AppState {
  cards: CardsState;
  raw_decks: RawDecksState;
  field: FieldState;
}
