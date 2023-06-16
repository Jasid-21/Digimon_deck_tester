import { CardsState, RawDecksState } from "./store.interfaces";

export interface AppState {
  cards: CardsState;
  raw_decks: RawDecksState;
}
