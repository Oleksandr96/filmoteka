import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Film } from '../interfaces/film.interface';
import { Filters } from '../interfaces/filters.interface';
import { FilterQuery } from '../interfaces/filter-query.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AppFilmsService {
  API_URL: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public fetch(params: FilterQuery): Observable<Film[]> {
    return this.http.get<Film[]>(`${this.API_URL}`, {
      params: new HttpParams({
        fromObject: { ...params },
      }),
    });
  }

  public getFilters(): Observable<Filters> {
    return this.http.get<Filters>(`${this.API_URL}/filters`);
  }
}
