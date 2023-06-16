import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DeckBuilderComponent } from './deck-builder/deck-builder.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'deckBuilder', component: DeckBuilderComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
