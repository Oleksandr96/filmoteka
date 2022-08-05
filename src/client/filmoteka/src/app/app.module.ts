import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing/app-routing.module';
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {ScrollingModule} from '@angular/cdk/scrolling';

import {AppComponent} from './app.component';
import {FilmsListComponent} from './components/films-list/films-list.component';

import {AppFilmsService} from "./services/app.films.service";


@NgModule({
  declarations: [
    AppComponent,
    FilmsListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ScrollingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AppFilmsService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
