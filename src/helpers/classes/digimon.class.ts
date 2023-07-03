import { PlacesType } from "../interfaces";
import { Card } from "./card.class";

export class Digimon {
  id: string;
  stages: Card[];
  place: PlacesType;
  x: number = 0;
  y: number = 0;

  constructor(id: string, stages: Card[], place: PlacesType, x?: number, y?: number) {
    this.id = id;
    this.place = place;
    this.stages = stages;

    if (x) this.x = x;
    if (y) this.y = y;
  }
}
