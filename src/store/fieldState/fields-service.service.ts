import { Injectable } from '@angular/core';
import { Card } from 'src/helpers/classes/card.class';
import { Field } from 'src/helpers/classes/field.class';
import { ZoneService } from '../store.interfaces';
import { Digimon } from 'src/helpers/classes/digimon.class';

@Injectable({
  providedIn: 'root'
})
export class FieldsServiceService implements ZoneService {
  fields: { own: boolean, field: Field }[] = [
    { own: true, field: new Field() },
    { own: false, field: new Field() },
  ]

  constructor() { }
  removeById(own: boolean, id: string): Digimon | undefined {
    const field = this.findField(own);
    if (!field) return;

    return field.removeById(id);
  }
  addCard(own: boolean, card: Card, x: number, y: number): void {
    const field = this.findField(own);
    if (!field) return;

    field.playDigimon(card, x, y);
  }

  findField(own: boolean): Field | undefined {
    const field = this.fields.find((f) => f.own == own)?.field;
    return field;
  }
}
