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
import { DuelComponent } from './duel/duel.component';
import { FieldSideComponent } from './field-side/field-side.component';
import { fieldReducer } from 'src/store/fieldStore/field.reducers';
import { DuelStateService } from 'src/store/fieldState/duelstate.service';
import { CardComponent } from './card/card.component';
import { RadialMenuComponent } from './radial-menu/radial-menu.component';
import { DeckComponent } from './deck/deck.component';
import { HandComponent } from './hand/hand.component';
import { HatchComponent } from './hatch/hatch.component';

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
    DuelComponent,
    FieldSideComponent,
    CardComponent,
    RadialMenuComponent,
    DeckComponent,
    HandComponent,
    HatchComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({
      cards: cardsReducer,
      raw_decks: rawDecksReducer,
      field: fieldReducer,
    }),
    SweetAlert2Module.forRoot(),
    FontAwesomeModule
  ],
  providers: [SavedDecksService, DuelStateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
