import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Deck } from 'src/helpers/classes/deck.class';
import { DuelStateService } from 'src/store/fieldState/duelstate.service';
import { RadialMenuComponent } from '../radial-menu/radial-menu.component';
import { menuItem } from 'src/helpers/interfaces';
import { Card } from 'src/helpers/classes/card.class';
import { SecuritiesServiceService } from 'src/store/fieldState/securities-service.service';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.css']
})
export class SecurityComponent implements OnInit {
  @Input() id!: string;
  @Input() own!: boolean;

  @ViewChild(RadialMenuComponent) radial!: RadialMenuComponent;
  menuItems: menuItem[] = [];

  cards: Card[] = [];
  margin: number = 60;

  constructor(
    private securitiesService: SecuritiesServiceService,
  ) {}

  ngOnInit(): void {
    this.securitiesService.findSecurity(this.own)?.cards$.subscribe((v) => {
      this.cards = v;

      const n = v.length;
      if (n > 5) {
        this.margin = (140 - 58 * n) / (n - 1) - 22;
        return;
      }
      this.margin = -60;
    });

    const items: menuItem[] = [
      {
        name: "Draw",
      },
    ];
    this.menuItems.push(...items);
  }
}
