import { RawCard, SavedRawDeck } from "src/helpers/interfaces";

interface CardsState {
  cards_store: RawCard[];
  current_card: RawCard;
  deck: RawCard[];
}

interface RawDecksState {
  rawDecks: SavedRawDeck[];
}

export { CardsState, RawDecksState };
