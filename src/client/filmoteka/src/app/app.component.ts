import {Component} from '@angular/core';
import {AppFilmsService} from "./services/app.films.service";
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  constructor() {
  }

  title: string = 'FILMOTEKA';


}
