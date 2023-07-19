import { Injectable, OnInit } from '@angular/core';
import { Card } from 'src/helpers/classes/card.class';
import { Digimon } from 'src/helpers/classes/digimon.class';
import { BehaviorSubject } from 'rxjs';
import { DecksServiceService } from './decks-service.service';
import { HandsServiceService } from './hands-service.service';
import { HatchsServiceService } from './hatchs-service.service';
import { SecuritiesServiceService } from './securities-service.service';
import { FieldsServiceService } from './fields-service.service';
import { PlacesType } from 'src/helpers/interfaces';
import { Deck } from 'src/helpers/classes/deck.class';
import { ZoneService } from '../store.interfaces';

@Injectable()
export class DuelStateService {
  dueling = !true;
  room_id: string = '';
  drops$ = new BehaviorSubject<{ own: boolean; drop: Card[] }[]>([]);
  current_card = new BehaviorSubject<Card | null>(null);

  services: { [key in PlacesType]?: ZoneService } = {
    deck: this.decksService,
    hand: this.handsService,
    security: this.securitiesService,
    field: this.fieldsService,
  }

  highlight = [
    { name: 'battle-zone', value: new BehaviorSubject<boolean>(false) },
    { name: 'digimon', value: new BehaviorSubject<boolean>(false) },
  ];

  constructor(
    private decksService: DecksServiceService,
    private handsService: HandsServiceService,
    private hatchsService: HatchsServiceService,
    private securitiesService: SecuritiesServiceService,
    private fieldsService: FieldsServiceService,
  ) {}

  moveCard(
    own: boolean,
    origin: PlacesType,
    destiny: PlacesType,
    card_id: string,
    x?: number,
    y?: number,
  ) {
    const originServ = this.services[origin];
    const destinyServ = this.services[destiny];
    if (!originServ || !destinyServ) return;

    const card = originServ.removeById(own, card_id);
    if (!card || card instanceof Digimon) return;

    if (destiny == 'field') {
      destinyServ.addCard(own, card, x, y);
      return;
    }
    destinyServ.addCard(own, card);
  }

  checkHighlight() {
    return this.highlight.find((h) => h.value.value)?.name;
  }

  disableHighlights() {
    this.highlight.forEach((h) => h.value.next(false));
  }

  setCurrentCard(card: Card) {
    this.current_card.next(card);
  }

  setPlayerState(own: boolean, deck: Card[], hatch: Card[]) {
    const securities = deck.splice(0, 5);

    this.decksService.updateDeck(own, deck);
    this.handsService.updateHand(own, []);
    this.hatchsService.updateHatchDown(own, hatch);
    this.securitiesService.updateSecurity(own, securities);

    this.setAllDefault();
  }

  setAllDefault() {
    this.drops$.next([
      { own: true, drop: [] },
      { own: false, drop: [] },
    ]);
  }

  drawCard(own: boolean) {
    const card = this.decksService.drawCard(own);
    console.log(card);
    if (!card) return;
    console.log("Defined xd");
    this.handsService.addCard(own, card);
  }

  hatchDigimon(own: boolean) {
    this.hatchsService.hatchDigimon(own);
  }
}
