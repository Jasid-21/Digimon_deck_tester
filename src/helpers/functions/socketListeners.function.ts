import { Socket } from "socket.io-client";
import { DuelStateService } from "src/store/fieldState/duelstate.service";
import { PlacesType } from "../interfaces";

export function duelListeners(socket: Socket, duelState: DuelStateService) {
  socket.on('draw-card', (data: {
    player_id: string;
  }) => {
    const own = socket.id == data.player_id;
    duelState.drawCard(own);
  });

  socket.on('hatch', (data: {
    player_id: string;
  }) => {
    const own = socket.id == data.player_id;
    duelState.hatchDigimon(own);
  });

  socket.on('move-card', (data: {
    player_id: string;
    card_id: string;
    origin: PlacesType;
    destiny: PlacesType;
    x?: number; y?: number;
  }) => {
    console.log(data);
    const own = socket.id == data.player_id;
    duelState.moveCard(own, data.origin, data.destiny, data.card_id, data.x, data.y);
  });
}
