import { createReducer, on } from "@ngrx/store";
import { addToDeck, removeFromDeck, setBuilderCards, setCurrentCard, setCurrentDeck } from "./cards.actions";
import { CardsState, RawDecksState } from "../store.interfaces";

const initialState: CardsState = {
  cards_store: [],
  deck: [],
  current_card: {
    name: '',
    type: '',
    color: '',

    stage: '',
    digi_type: '',
    attribute: '',

    level: 0,
    play_cost: 0,
    evolution_cost: 0,
    cardrarity: '',
    artist: '',
    dp: 0,
    cardnumber: '',
    maineffect: null,
    soureeffect: null,
    set_name: '',
    card_sets: [],
    image_url: '',
  },
}


const cardsReducer = createReducer(
  initialState,
  on(setBuilderCards, (state, { cards }) => ({
    ...state,
    cards_store: cards
  })),

  on(setCurrentCard, (state, { card }) => ({
    ...state,
    current_card: card
  })),

  on(setCurrentDeck, (state, { deck }) => ({
    ...state,
    deck: deck.raw_deck,
  })),

  on(addToDeck, (state, { card }) => {
    const count = state.deck.filter(c => c.cardnumber == card.cardnumber).length;
    if (count == 4) {
      alert("You can only have 4 copies of each card code per deck...");
      return state;
    }

    return ({
      ...state,
      deck: [...state.deck, card]
    })
  }),

  on(removeFromDeck, (state, { code }) => {
    const index = state.deck.findIndex((c) => c.cardnumber == code);
    if (index < 0) return state;
    const newDeck = [...state.deck]
    newDeck.splice(index, 1);
    return ({
      ...state,
      deck: newDeck
    });
  })
);

export { cardsReducer };
