import { BehaviorSubject } from "rxjs";
import { Digimon } from "./digimon.class";
import { Card } from "./card.class";
import { random_code } from "../functions/random_code.function";

export class Field {
  digimons = new BehaviorSubject<Digimon[]>([]);

  playDigimon(card: Card, x: number, y: number): Digimon[] {
    const digimon = this.digimonFromCard(card, x, y);
    const current = this.digimons.value;
    current.push(digimon);
    this.digimons.next(current);

    return current;
  }

  digimonFromCard(card: Card, x: number, y: number): Digimon {
    const id = random_code(5);
    const digimon = new Digimon(id, [card], 'field', x, y);

    return digimon;
  }

  removeById(digi_id: string): Digimon | undefined {
    const current = this.digimons.value;
    const index = current.findIndex((d) => d.id == digi_id);
    if (index < 0) return;

    const digi = current.splice(index, 1);
    this.digimons.next(current);
    return digi[0];
  }
}
