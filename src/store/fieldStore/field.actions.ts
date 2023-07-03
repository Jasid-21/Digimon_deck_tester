import { createAction, props } from "@ngrx/store";
import { Card } from 'src/helpers/classes/card.class';

export const setFieldSide = createAction(
  '[Duel] set the main deck to both players',
  props<{ player_id: string, deck: Card[], hatch_down: Card[] }>()
);
export const drawCard = createAction(
  '[Duel] draw a card',
  props<{ user_id: string }>()
);
