import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppFilmsService } from '../../services/app.films.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Film } from '../../interfaces/film.interface';
import { FormControl, FormGroup } from '@angular/forms';
import { Filters } from '../../interfaces/filters.interface';
import { FilterQuery } from '../../interfaces/filter-query.interface';

@Component({
  selector: 'app-films-list',
  templateUrl: './films-list.component.html',
  styleUrls: ['./films-list.component.scss'],
})
export class FilmsListComponent implements OnInit, OnDestroy {
  pageNumber: number = 0;
  pageSize: number = 20;
  films: Film[] = [];
  filterForm!: FormGroup;
  filters!: Filters;
  filters$!: Subscription;
  films$!: Subscription;

  constructor(
    private appFilmsService: AppFilmsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.filterForm = new FormGroup({
      year: new FormControl(''),
      genre: new FormControl(''),
    });
    this.resetFilters();
    this.getFilters();
  }

  ngOnDestroy(): void {
    this.films$.unsubscribe();
    this.filters$.unsubscribe();
  }

  public fetch(query: FilterQuery): void {
    if (query) {
      !query.year ? delete query.year : false;
      !query.genre ? delete query.genre : false;
    }
    Object.assign(query, {
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
    });

    this.films$ = this.appFilmsService
      .fetch(query)
      .subscribe((data: Film[]) => {
        this.films = this.films.concat(data);
      });
  }

  loadMore(): void {
    this.pageNumber += 1;
    this.fetch(this.filterForm.value);
  }

  getFilters(): void {
    this.filters$ = this.appFilmsService
      .getFilters()
      .subscribe((filters: Filters) => (this.filters = filters));
  }

  applyFilters(): void {
    const filters = this.filterForm.value;
    this.films = [];
    this.router.navigate([''], { queryParams: filters });
    this.fetch(this.filterForm.value);
  }

  resetFilters(): void {
    this.filterForm.reset();
    this.pageNumber = 0;
    this.films = [];
    this.fetch({});
    this.router.navigate(['/']);
  }
}
