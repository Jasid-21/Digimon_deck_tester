import { BehaviorSubject } from "rxjs";
import { random_code } from "../functions/random_code.function";
import { Card } from "./card.class";
import { Digimon } from "./digimon.class";

export class HatchUp {
  digimon = new BehaviorSubject<Digimon | null>(null);

  constructor() {}

  hatchDigimon(first: Card): Digimon {
    const digi_id = random_code(5);
    const digi = new Digimon(digi_id, [first], 'hatch_up');
    this.setProperties(digi);

    this.digimon.next(digi);
    return digi;
  }

  digiEvolve(card: Card): Digimon | undefined {
    if (!this.digimon.value) return;

    const current = this.digimon.value;
    current.digiEvolve(card);
    this.digimon.next(current);

    return this.digimon.value;
  }

  getDigimon(): Digimon | undefined {
    if (!this.digimon.value) return;
    if (this.digimon.value.stages.length == 1) return;

    const digi = this.digimon.value;
    this.digimon.next(null);

    return digi;
  }

  setProperties(digimon: Digimon) {
    digimon.stages.forEach((card) => {
      card.hidden = false;
      card.rested = false;
      card.faceDown = false;
      card.place = 'hatch_up';
    });
  }
}
