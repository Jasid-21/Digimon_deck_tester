import { Injectable } from '@angular/core';
import { Card } from 'src/helpers/classes/card.class';
import { Digimon } from 'src/helpers/classes/digimon.class';
import { BehaviorSubject } from 'rxjs';
import { DecksServiceService } from './decks-service.service';
import { HandsServiceService } from './hands-service.service';
import { HatchsServiceService } from './hatchs-service.service';
import { SecuritiesServiceService } from './securities-service.service';
import { FieldsServiceService } from './fields-service.service';
import { PlacesType } from 'src/helpers/interfaces';
import { ZoneService } from '../store.interfaces';
import { CardsDisplayerService } from './cards-displayer.service';

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
    private displayerService: CardsDisplayerService,
  ) {}

  revealCard(card: Card): void {
    this.displayerService.addCard(card);
  }

  stopRevealing(own: boolean): void {
    const cards: Card[] = this.displayerService.resetCards();
    for (var card of cards) {
      const destinyServ = this.services[card.place];
      destinyServ?.addCard(own, card);
    }
  }

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

  revealTopDeck(own: boolean) {
    const card = this.decksService.drawCard(own);
    if (!card) return;

    this.displayerService.addCard(card);
  }

  resetCardsDisplayer(player_id: string) {
    const cards = this.displayerService.resetCards();
    cards.forEach((c) => {
      const own = c.player == player_id;
      const destService = this.services[c.place];
      destService?.addCard(own, c);
    });
  }

  hatchDigimon(own: boolean) {
    this.hatchsService.hatchDigimon(own);
  }
}
