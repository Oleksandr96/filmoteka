import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Film} from "../interfaces/film.interface";
import {Filters} from "../interfaces/filters.interface";

@Injectable({
  providedIn: 'root',
})
export class AppFilmsService {
  API_URL: string = "http://localhost:3000";

  constructor(private http: HttpClient) {
  }

  public fetch(params: any = {}): Observable<Film[]> {
    return this.http.get<Film[]>(`${this.API_URL}`, {
      params: new HttpParams({
        fromObject: params,
      }),
    });
  }

  public getFilters(): Observable<Filters> {
    return this.http.get<Filters>(`${this.API_URL}/filters`);
  }
}
