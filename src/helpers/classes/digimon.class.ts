import { PlacesType } from "../interfaces";
import { Card } from "./card.class";

export class Digimon {
  id: string;
  stages: Card[];
  place: PlacesType;
  x: number;
  y: number;

  constructor(id: string, stages: Card[], place: PlacesType, x = 0, y = 0) {
    this.id = id;
    this.place = place;
    this.stages = stages;

    this.x = x;
    this.y = y;
  }

  suspend_unsuspend(): void {
    const card: Card = this.stages[this.stages.length - 1];
    card.rotate();
  }

  isSuspended(): boolean {
    const card: Card = this.stages[this.stages.length - 1];
    return card.rested;
  }
}
