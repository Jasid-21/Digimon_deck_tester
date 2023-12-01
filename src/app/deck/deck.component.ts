import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { WebsocketService } from '../services/websocket.service';
import { RadialMenuComponent } from '../radial-menu/radial-menu.component';
import { menuItem } from 'src/helpers/interfaces';
import { faPlus, faEye } from '@fortawesome/free-solid-svg-icons';
import { DecksServiceService } from 'src/store/fieldState/decks-service.service';
import { Card } from 'src/helpers/classes/card.class';

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

  cards: Card[] = [];

  constructor(
    private socketService: WebsocketService,
    private decksService: DecksServiceService,
  ) {}

  ngOnInit(): void {
    this.decksService.decks.find((d) => d.own == this.own)?.deck.cards$
    .subscribe((v) => {
      this.cards = v
    });

    const items: menuItem[] = [
      {
        name: "Draw",
        icon: faPlus,
        action: this.drawCard.bind(this),
      },

      {
        name: 'Reveal_Top',
        icon: faEye,
        action: this.revealTop.bind(this),
      }
    ];
    this.menuItems.push(...items);
  }

  openMenu(event: MouseEvent) {
    event.stopPropagation();
    this.radial.openMenu(this.id);
  }

  drawCard() {
    this.socketService.drawCard();
  }

  showCards() {
    alert(this.cards.length);
  }

  revealTop(): void {
    this.socketService.revealTopDeck();
  }
}
