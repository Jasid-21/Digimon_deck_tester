import { createAction, props } from "@ngrx/store";
import { SavedRawDeck } from "src/helpers/interfaces";

const setRawDecks = createAction(
  '[App] set the saved raw decks',
  props<{ decks: SavedRawDeck[] }>()
);

const addDeck = createAction(
  '[Deck Builder] add a new deck to raw_decks',
  props<{ deck: SavedRawDeck }>()
);

export { setRawDecks, addDeck };
