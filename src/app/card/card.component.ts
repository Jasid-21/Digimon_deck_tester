import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Card } from 'src/helpers/classes/card.class';
import { DuelStateService } from 'src/store/fieldState/duelstate.service';
import { RadialMenuComponent } from '../radial-menu/radial-menu.component';
import { menuItem } from 'src/helpers/interfaces';
import { faEye, faRepeat } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @ViewChild(RadialMenuComponent) radial!: RadialMenuComponent;
  @Input() card!: Card;
  menuItems: menuItem[] = [];

  constructor(
    private duelState: DuelStateService,
  ) {}

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
  }

  setAsCurrent() {
    if (this.card.hidden) return;
    this.duelState.setCurrentCard(this.card);
  }

  loadToMove(event: DragEvent) {
    event.dataTransfer?.setData('card_id', this.card.id);
    event.dataTransfer?.setData('card_place', this.card.place);
    event.stopPropagation();
  }
}
