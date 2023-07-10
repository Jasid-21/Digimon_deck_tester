import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Deck } from 'src/helpers/classes/deck.class';
import { DuelStateService } from 'src/store/fieldState/duelstate.service';
import { RadialMenuComponent } from '../radial-menu/radial-menu.component';
import { menuItem } from 'src/helpers/interfaces';

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

  security: Deck = new Deck();
  margin: number = 60;

  constructor(
    private duelState: DuelStateService,
  ) {}

  ngOnInit(): void {
    this.duelState.securities$.subscribe((v) => {
      const s = v.find((s) => s.own == this.own);
      if (!s) return;

      console.log(s);
      this.security.setDeck(s.security);

      // Make margin bottom calculation.
      const n = s.security.length;
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
