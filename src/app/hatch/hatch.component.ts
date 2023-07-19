import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Digimon } from 'src/helpers/classes/digimon.class';
import { Deck } from 'src/helpers/classes/deck.class';
import { menuItem } from 'src/helpers/interfaces';
import { DuelStateService } from 'src/store/fieldState/duelstate.service';
import { faEgg } from '@fortawesome/free-solid-svg-icons';
import { RadialMenuComponent } from '../radial-menu/radial-menu.component';
import { WebsocketService } from '../services/websocket.service';
import { Card } from 'src/helpers/classes/card.class';
import { HatchsServiceService } from 'src/store/fieldState/hatchs-service.service';

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

  hatch_down: Card[] = []
  hatch_up: Digimon | null = null;

  constructor(
    private hatchsService: HatchsServiceService,
    private socket: WebsocketService,
  ) {}

  ngOnInit(): void {
    const items: menuItem[] = [
      { name: 'Hatch', icon: faEgg, action: this.hatch.bind(this) },
    ];
    this.menuItems.push(...items);

    this.hatchsService.findHatchDown(this.own)?.cards$.subscribe((v) => this.hatch_down = v);
    this.hatchsService.findHatchUp(this.own)?.digimon.subscribe((v) => this.hatch_up = v);
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
