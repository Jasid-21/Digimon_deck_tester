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
import { SavedDecksService } from './services/saved-decks.service';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RoomsComponent } from './rooms/rooms.component';
import { RequestsModalComponent } from './requests-modal/requests-modal.component';
import { HostModalComponent } from './host-modal/host-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    DeckBuilderComponent,
    HomeComponent,
    NavbarComponent,
    RawCardComponent,
    CardResultItemComponent,
    RoomsComponent,
    RequestsModalComponent,
    HostModalComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({
      cards: cardsReducer,
      raw_decks: rawDecksReducer
    }),
    SweetAlert2Module.forRoot(),
    FontAwesomeModule
  ],
  providers: [SavedDecksService],
  bootstrap: [AppComponent]
})
export class AppModule { }
