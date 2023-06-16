type PlacesType = 'hand' | 'field' | 'digimon' | 'drop' | 'deck' | 'security' | 'hatch_down' | 'hatch_up';
type CardStrProp = 'name' | 'color' | 'type';
type CardNumProp = 'level' | 'play_cost' | 'evolution_cost';

interface CardInterface {
  id: string;
  imgUrl: string;
  hidden: boolean;
  rested: boolean;
  faceDown: boolean;
  place: PlacesType;
  player: string;
}

interface RawCard {
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

interface codeDeck {
  name: string;
  code_deck: string[];
}

interface SavedRawDeck {
  name: string;
  raw_deck: RawCard[];
}

export {
  CardInterface,
  RawCard,
  PlacesType,
  CardStrProp,
  CardNumProp,
  SavedRawDeck,
  codeDeck,
};
