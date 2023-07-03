import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DeckBuilderComponent } from './deck-builder/deck-builder.component';
import { RoomsComponent } from './rooms/rooms.component';
import { DuelComponent } from './duel/duel.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'deckBuilder', component: DeckBuilderComponent },
  { path: 'rooms', component: RoomsComponent },
  { path: 'duel', component: DuelComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
