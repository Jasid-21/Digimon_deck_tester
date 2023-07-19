import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Card } from 'src/helpers/classes/card.class';
import { DuelStateService } from 'src/store/fieldState/duelstate.service';
import { WebsocketService } from '../services/websocket.service';

@Component({
  selector: 'app-duel',
  templateUrl: './duel.component.html',
  styleUrls: ['./duel.component.css']
})
export class DuelComponent implements OnInit {
  current: Card | null = null;
  current$ = this.duelState.current_card.subscribe((v) => this.current = v);

  constructor(
    private duelState: DuelStateService,
    private router: Router,
    private socket: WebsocketService,
  ) {}

  ngOnInit(): void {
    if (!this.duelState.dueling) {
      this.router.navigate(['/rooms']);
    }
  };

  handleClick(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    const active = this.duelState.checkHighlight();
    if (!active) return;

    const target = event.target as HTMLElement;
    if (!target.classList.contains(active)) return;

    alert(active);
  }
}
