import { Component, OnInit } from '@angular/core';
import { Card } from 'src/helpers/classes/card.class';
import { CardsDisplayerService } from 'src/store/fieldState/cards-displayer.service';
import { faX } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-cards-displayer',
  templateUrl: './cards-displayer.component.html',
  styleUrls: ['./cards-displayer.component.css']
})
export class CardsDisplayerComponent implements OnInit {
  cards: Card[] = [];
  fax = faX;

  constructor(
    private displayerService: CardsDisplayerService,
  ) {}
  ngOnInit(): void {
    this.displayerService.cards$.subscribe((v) => {
      this.cards = v;
    });
  }

  closeDisplayer(): void {
    this.displayerService.resetCards();
  }
}
