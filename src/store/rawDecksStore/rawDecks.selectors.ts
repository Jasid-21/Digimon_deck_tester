import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { RawDecksState } from "../store.interfaces";

const selectRawDecksState = (state: AppState) => state.raw_decks;

const selectRawDecks = createSelector(
  selectRawDecksState,
  (state: RawDecksState) => state.rawDecks
)

export { selectRawDecks };
