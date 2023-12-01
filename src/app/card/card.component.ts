import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Card } from 'src/helpers/classes/card.class';
import { DuelStateService } from 'src/store/fieldState/duelstate.service';
import { RadialMenuComponent } from '../radial-menu/radial-menu.component';
import { PlacesType, menuItem } from 'src/helpers/interfaces';
import { faEye, faRepeat } from '@fortawesome/free-solid-svg-icons';
import { WebsocketService } from '../services/websocket.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit, OnChanges {
  @ViewChild(RadialMenuComponent) radial!: RadialMenuComponent;
  @Input() card!: Card;
  menuItems: menuItem[] = [];

  constructor(
    private duelState: DuelStateService,
    private socketServ: WebsocketService,
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    this.setHiddenProp(this.socketServ.socket.id);
  }

  ngOnInit(): void {
    console.log(this.card);

    if (this.card.place == 'hand') {
      this.menuItems = [
        { name: 'Reveal', icon: faRepeat },
      ];
    }

    if (this.card.place == 'security') {
      this.menuItems = [
        { name: 'Reveal', icon: faRepeat },
        { name: 'Reveal All', icon: faEye },
      ];
    }

    this.setHiddenProp(this.socketServ.socket.id);
  }

  setHiddenProp(player: string) {
    const owner = this.card.player;
    const hidden_places: PlacesType[] = ['hatch_down', 'security', 'deck'];
    const facedown = player != owner && this.card.faceDown;
    const hand = player != owner && this.card.place == 'hand';
    const place = hidden_places.some((p) => p == this.card.place);

    if (facedown || hand || place) {
      this.card.hidden = true;
    }
  }

  setAsCurrent() {
    if (this.card.hidden) return;
    this.duelState.setCurrentCard(this.card);
    console.log(this.card);
  }

  loadToMove(event: DragEvent) {
    event.dataTransfer?.setData('card_id', this.card.id);
    event.dataTransfer?.setData('card_place', this.card.place);
    event.stopPropagation();
  }
}
