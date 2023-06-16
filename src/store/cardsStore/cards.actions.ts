import { createAction, props } from "@ngrx/store";
import { RawCard, SavedRawDeck } from "src/helpers/interfaces";

const setBuilderCards = createAction(
  '[Deck Builder] set api cards',
  props<{ cards: RawCard[] }>()
);

const setCurrentCard = createAction(
  '[Deck Builder] set the current card',
  props<{ card: RawCard }>()
);

const setCurrentDeck = createAction(
  '[Deck Builder] set the current deck',
  props<{ deck: SavedRawDeck }>()
);

const addToDeck = createAction(
  '[Deck Builder] add card to deck',
  props<{ card: RawCard }>()
);

const removeFromDeck = createAction(
  '[Deck Builder] remove card from deck',
  props<{ code: string }>()
);

export {
  setBuilderCards, setCurrentCard,
  addToDeck, removeFromDeck, setCurrentDeck
};
