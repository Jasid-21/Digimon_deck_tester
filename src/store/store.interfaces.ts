import { Card } from 'src/helpers/classes/card.class';
import { Digimon } from 'src/helpers/classes/digimon.class';
import { RawCard, SavedRawDeck } from "src/helpers/interfaces";

export interface CardsState {
  cards_store: RawCard[];
  current_card: RawCard;
  deck: RawCard[];
}

export interface RawDecksState {
  rawDecks: SavedRawDeck[];
}

export interface PlayerState {
  player_id: string;
  deck: Card[];
  drop: Card[];
  Hand: Card[];
  HatchDown: Card[];
  HatchUp: Digimon | null;
  Security: Card[];
  BattleArea: Digimon[];
}

export interface FieldState {
  field: PlayerState[],
}

export interface ZoneService {
  removeById(own: boolean, id: string): Card | Digimon | undefined;
  addCard(own: boolean, card: Card, x?: number, y?: number): void;
}
