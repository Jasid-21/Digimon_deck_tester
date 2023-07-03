import { PlacesType } from "../interfaces";
import { Digimon } from "./digimon.class";

export class HatchUp {
  name: PlacesType = 'hatch_up';
  digimon: Digimon | null;

  constructor(digimon: Digimon | null) {
    this.digimon = digimon;
  }
}
