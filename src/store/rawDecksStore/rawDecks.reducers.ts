import { createReducer, on } from "@ngrx/store";
import { RawDecksState } from "../store.interfaces";
import { addDeck, setRawDecks } from "./rawDecks.actions";

const initialState: RawDecksState = {
  rawDecks: [],
}

const rawDecksReducer = createReducer(
  initialState,
  on(setRawDecks, (state, { decks }) => ({
    ...state,
    rawDecks: decks,
  })),

  on(addDeck, (state, { deck }) => {
    const index = state.rawDecks.findIndex((d) => d.name == deck.name);
    if (index < 0) {
      return ({
        ...state,
        rawDecks: [...state.rawDecks, deck],
      });
    }

    const new_decks = [...state.rawDecks];
    new_decks.splice(index, 1, deck);

    return ({
      ...state,
      rawDecks: new_decks,
    });
  })
);

export { rawDecksReducer };
