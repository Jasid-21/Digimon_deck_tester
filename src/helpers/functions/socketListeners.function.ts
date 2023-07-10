import { Socket } from "socket.io-client";
import { Card } from 'src/helpers/classes/card.class';
import { Digimon } from 'src/helpers/classes/digimon.class';
import { DuelStateService } from "src/store/fieldState/duelstate.service";
import { CardInterface, DigimonInterface } from "../interfaces";

export function duelListeners(socket: Socket, duelState: DuelStateService) {
  socket.on('draw-card', (data: {
    player_id: string;
    state: {
      hand: CardInterface[];
      deck: CardInterface[];
    };
  }) => {
    console.log(data);
    const own = socket.id == data.player_id;
    console.log(own);
    console.log('---------------');

    const deck = data.state.deck.map((c) => new Card(c));
    const hand = data.state.hand.map((c) => new Card(c));

    duelState.handleUpdate({ own, deck }, duelState.decks$);
    duelState.handleUpdate({ own, hand }, duelState.hands$);
  });

  socket.on('hatch', (data: {
    player_id: string;
    state: {
      hatch_down: CardInterface[];
      hatch_up: DigimonInterface;
      digimon: CardInterface[];
    }

  }) => {
    console.log(data);
    const own = socket.id == data.player_id;
    const hatch_down = data.state.hatch_down.map((c) => new Card(c));
    const stages = data.state.digimon.map((c) => new Card(c));
    const digimon = new Digimon(data.state.hatch_up.id, stages, 'hatch_up');

    duelState.handleUpdate({ own, hatch_down }, duelState.hatch_downs$);
    duelState.handleUpdate({ own, hatch_up: digimon }, duelState.hatch_ups$);
  });

  socket.on('move-card', (data: {

  }) => {

  });
}
