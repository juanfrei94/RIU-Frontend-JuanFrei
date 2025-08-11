import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';

import { Hero } from '../entities';
import { environments } from '../../../../environments/environments';

@Injectable()
export class HeroesService {
  private readonly _http = inject(HttpClient);
  private readonly baseUrl = `${environments.baseUrl}/heroes`;

  public filter = signal('');
  public heroList = computed(() => this._heroList());

  private _heroList = signal<Hero[]>([]);
  private _skipFirstRun: boolean = true;

  constructor() {
    this._setupFilterEffect();
  }

  public getAll(): Observable<Hero[]> {
    return this._http.get<Hero[]>(this.baseUrl).pipe(
      catchError(() => of([])),
      tap((heroes) => this._heroList.set(heroes))
    );
  }

  public getByFilter(filter: string | null): Observable<Hero[]> {
    return this._http
      .get<Hero[]>(`${this.baseUrl}?q=${filter}`)
      .pipe(tap((heroes) => this._heroList.set(heroes)));
  }

  public getById(id: string): Observable<Hero | null> {
    return this._http
      .get<Hero>(`${this.baseUrl}/${id}`)
      .pipe(catchError(() => of(null)));
  }

  public addHero(hero: Hero): Observable<Hero> {
    const publisherToId = hero.publisher.split(' ')[0].toLowerCase();
    return this._http
      .post<Hero>(this.baseUrl, {
        ...hero,
        id: `${publisherToId}-${hero.superhero.toLowerCase()}`,
      })
      .pipe(
        catchError(({ error }: HttpErrorResponse) => {
          const duplicated = String(error).includes('duplicate');
          return throwError(() => ({ error, duplicated }));
        })
      );
  }

  public updateHero(hero: Hero): Observable<Hero> {
    return this._http.patch<Hero>(`${this.baseUrl}/${hero.id}`, hero);
  }

  public removeById(id: string): Observable<boolean> {
    return this._http.delete(`${this.baseUrl}/${id}`).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }

  public save(hero: Hero, isEdit: boolean): Observable<Hero> {
    return isEdit ? this.updateHero(hero) : this.addHero(hero);
  }

  private _setupFilterEffect(): void {
    effect(() => {
      const filter = this.filter().trim();

      if (this._skipFirstRun) {
        this._skipFirstRun = false;
        return;
      }

      if (!filter) {
        this.getAll().subscribe();
        return;
      }

      this.getByFilter(filter).subscribe();
    });
  }
}
