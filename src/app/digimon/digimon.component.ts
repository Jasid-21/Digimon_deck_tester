import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Digimon } from 'src/helpers/classes/digimon.class';
import { RadialMenuComponent } from '../radial-menu/radial-menu.component';
import { menuItem } from 'src/helpers/interfaces';
import { faRotateLeft, faRotateRight, faBurst } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-digimon',
  templateUrl: './digimon.component.html',
  styleUrls: ['./digimon.component.css']
})
export class DigimonComponent implements OnInit {
  @ViewChild(RadialMenuComponent) radial!: RadialMenuComponent;
  @Input() digimon!: Digimon;

  menuRested: menuItem[] = [];
  menuItems: menuItem[] = [];

  ngOnInit(): void {
    if (this.digimon.place != 'field') return;

    this.menuItems = [
      {
        name: 'Sustend',
        icon: faRotateLeft,
        action: this.digimon.suspend_unsuspend.bind(this.digimon),
      },
      {
        name: 'Attack',
        icon: faBurst,
        action: this.attack.bind(this),
      },
    ];

    this.menuRested = [
      {
        name: 'Refresh',
        icon: faRotateRight,
        action: this.digimon.suspend_unsuspend.bind(this.digimon),
      },
    ];
  }

  attack() {

  }
}
