import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DeckBuilderComponent } from './deck-builder/deck-builder.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { StoreModule } from '@ngrx/store';
import { cardsReducer } from 'src/store/cardsStore/cards.reducers';
import { rawDecksReducer } from 'src/store/rawDecksStore/rawDecks.reducers';
import { RawCardComponent } from './raw-card/raw-card.component';
import { CardResultItemComponent } from './card-result-item/card-result-item.component';
import { SavedDecksService } from './saved-decks.service';

@NgModule({
  declarations: [
    AppComponent,
    DeckBuilderComponent,
    HomeComponent,
    NavbarComponent,
    RawCardComponent,
    CardResultItemComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({
      cards: cardsReducer,
      raw_decks: rawDecksReducer
    }),
  ],
  providers: [SavedDecksService],
  bootstrap: [AppComponent]
})
export class AppModule { }
