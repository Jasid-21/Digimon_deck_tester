import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Deck } from 'src/helpers/classes/deck.class';
import { WebsocketService } from '../services/websocket.service';
import { DuelStateService } from 'src/store/fieldState/duelstate.service';
import { RadialMenuComponent } from '../radial-menu/radial-menu.component';
import { menuItem } from 'src/helpers/interfaces';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.css']
})
export class DeckComponent implements OnInit {
  @Input() id!: string;
  @Input() own!: boolean;

  @ViewChild(RadialMenuComponent) radial!: RadialMenuComponent;
  menuItems: menuItem[] = [];

  deck: Deck = new Deck();

  constructor(
    private socket: WebsocketService,
    private duelState: DuelStateService,
  ) {}

  ngOnInit(): void {
    this.duelState.decks$.subscribe((v) => {
      const d = v.find((d) => d.own == this.own);
      if (!d) return;

      this.deck.setDeck(d.deck);
    });

    const items: menuItem[] = [
      {
        name: "Draw",
        icon: faPlus,
        action: this.drawCard.bind(this),
      },
    ];
    this.menuItems.push(...items);
  }

  openMenu(event: MouseEvent) {
    event.stopPropagation();
    this.radial.openMenu(this.id);
  }

  drawCard() {
    this.socket.drawCard();
  }
}
