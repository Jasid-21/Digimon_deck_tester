import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { FieldState } from "../store.interfaces";

export const initialState = (state: AppState) => state.field;

export const selectDeck = createSelector(
  initialState,
  (state: FieldState, player_id: string) => {
    const field = state.field.find((f) => f.player_id == player_id);
    if (!field) return [];
    return field.deck;
  }
);
