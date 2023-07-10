import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Digimon } from 'src/helpers/classes/digimon.class';
import { Deck } from 'src/helpers/classes/deck.class';
import { menuItem } from 'src/helpers/interfaces';
import { DuelStateService } from 'src/store/fieldState/duelstate.service';
import { faEgg } from '@fortawesome/free-solid-svg-icons';
import { RadialMenuComponent } from '../radial-menu/radial-menu.component';
import { WebsocketService } from '../services/websocket.service';

@Component({
  selector: 'app-hatch',
  templateUrl: './hatch.component.html',
  styleUrls: ['./hatch.component.css']
})
export class HatchComponent implements OnInit {
  @ViewChild(RadialMenuComponent) radial!: RadialMenuComponent;
  @Input() own!: boolean;
  @Input() id!: string;
  menuItems: menuItem[] = [];

  hatch_down: Deck = new Deck();
  hatch_up: Digimon | null = null;

  constructor(
    private duelState: DuelStateService,
    private socket: WebsocketService,
  ) {}

  ngOnInit(): void {
    const items: menuItem[] = [
      { name: 'Hatch', icon: faEgg, action: this.hatch.bind(this) },
    ];

    this.menuItems.push(...items);

    this.duelState.hatch_downs$.subscribe((v) => {
      const hatch = v.find((h) => h.own == this.own);
      if (!hatch) return;
      this.hatch_down.setDeck(hatch.hatch_down);
    });

    this.duelState.hatch_ups$.subscribe((v) => {
      const h = v.find((h) => h.own == this.own);
      if (!h) return;
      h.hatch_up?.stages.forEach((c) => c.hidden = false);
      this.hatch_up = h.hatch_up;
    });
  }

  openMenu(event: MouseEvent) {
    event.stopPropagation();
    this.radial.openMenu(this.id);
  }

  hatch() {
    if (this.hatch_up) return;
    this.socket.hatchDigimon();
  }
}
