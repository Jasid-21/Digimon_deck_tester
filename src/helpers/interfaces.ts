import { Card } from 'src/helpers/classes/card.class';
import { Digimon } from 'src/helpers/classes/digimon.class';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

export type PlacesType = 'hand' | 'field' | 'digimon' | 'drop' | 'deck' | 'security' | 'hatch_down' | 'hatch_up';
export type CardStrProp = 'name' | 'color' | 'type';
export type CardNumProp = 'level' | 'play_cost' | 'evolution_cost';
export type MoveCardPlaceContent = Card[] | Digimon | Digimon[];

export interface CardInterface {
  //Identity properties.
  id: string;
  name: string;
  imgUrl: string;
  cardnumber: string;
  type: string;

  //Effects.
  maineffect: string;
  soureeffect: string;

  //Traits.
  stage: string;
  digi_type: string;
  attribute: string;

  //State properties.
  hidden: boolean;
  rested: boolean;
  faceDown: boolean;

  //Position properties.
  place: PlacesType;
  player: string;
}


export interface RawCard {
  name: string;
  type: string;
  color: string;

  stage: string;
  digi_type: string;
  attribute: string;

  level: number;
  play_cost: number;
  evolution_cost: number;

  cardrarity: string;
  artist: string;
  dp: number;
  cardnumber: string;
  maineffect: string | null;
  soureeffect: string | null;
  set_name: string;
  card_sets: string[];
  image_url: string;
}

export interface DigimonInterface {
  id: string;
  stages: Card[];
  place: PlacesType;
  x: number;
  y: number;
}

export interface codeDeck {
  name: string;
  code_deck: string[];
}

export interface SavedRawDeck {
  name: string;
  raw_deck: RawCard[];
}

export interface AlertObject {
  swal: boolean;
  title?: string;
  content: string;
  icon?: 'success' | 'error' | 'warning' | 'info' | 'question';
  cancel?: boolean;
}

export interface Room {
  id: string;
  players: string[];
}

export interface Request {
  username: string;
  user_id: string;
  deck: RawCard[];
}

export interface FieldSide {
  user_id: string;
  deck: RawCard[];
}

export interface menuItem {
  icon?: IconDefinition;
  name: string;
  action?: Function;
}
