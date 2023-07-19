import { Injectable } from '@angular/core';
import { Card } from 'src/helpers/classes/card.class';
import { Digimon } from 'src/helpers/classes/digimon.class';
import { HatchDown } from 'src/helpers/classes/hatch_down.class';
import { HatchUp } from 'src/helpers/classes/hatch_up.class';

@Injectable({
  providedIn: 'root'
})
export class HatchsServiceService {
  hatchDowns: { own: boolean; hatch: HatchDown }[] = [
    { own: true, hatch: new HatchDown() },
    { own: false, hatch: new HatchDown() },
  ];

  hatchUps: { own: boolean; hatch: HatchUp }[] = [
    { own: true, hatch: new HatchUp() },
    { own: false, hatch: new HatchUp() },
  ];

  constructor() { }

  updateHatchDown(own: boolean, cards: Card[]) {
    const hatch = this.findHatchDown(own);
    if (!hatch) return;

    hatch.updateHatchDown(own, cards);
  }

  hatchDigimon(own: boolean): Digimon | undefined {
    const hatchUp = this.findHatchUp(own)
    const hatchDown = this.findHatchDown(own);

    if (!hatchUp || !hatchDown) return;
    if (hatchUp.digimon.value) return;

    const card = hatchDown.removeLast();
    if (!card) return;

    return hatchUp.hatchDigimon(card);
  }

  digiEvolve(own: boolean, stage: Card): Digimon | undefined {
    const hatchUp = this.findHatchUp(own);
    if (!hatchUp) return;

    return hatchUp.digiEvolve(stage);
  }

  getToBattle(own: boolean): Digimon | undefined {
    const hatch = this.findHatchUp(own);
    if (!hatch) return;

    return hatch.getDigimon();
  }

  findHatchDown(own: boolean): HatchDown | undefined {
    const hatch = this.hatchDowns.find((h) => h.own == own)?.hatch;
    return hatch;
  }

  findHatchUp(own: boolean): HatchUp | undefined {
    const hatch = this.hatchUps.find((h) => h.own == own)?.hatch;
    return hatch;
  }
}
