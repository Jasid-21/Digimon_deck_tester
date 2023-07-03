import { createReducer, on } from "@ngrx/store";
import { FieldState, PlayerState } from "../store.interfaces";
import { setFieldSide } from "./field.actions";

const initialState: FieldState = {
  field: [],
}

export const fieldReducer = createReducer(
  initialState,

  on(setFieldSide, (state, { player_id, deck, hatch_down }) => {
    const playerState: PlayerState = {
      player_id,
      deck,
      drop: [],
      Hand: [],
      HatchDown: hatch_down,
      HatchUp: null,
      Security: [],
      BattleArea: [],
    }

    const newField = [...state.field];
    newField.push(playerState);
    return {
      ...state,
      field: newField,
    }
  }),
);
