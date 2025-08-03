import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { Hero } from '../entities';
import { environments } from '../../../../environments/environments';

@Injectable()
export class HeroesService {
  private readonly _http = inject(HttpClient);
  private readonly baseUrl = `${environments.baseUrl}/heroes`;

  public readonly filter = signal('');

  public heroList = computed(() => this._heroList());

  private _heroList = signal<Hero[]>([]);

  getAll(): Observable<Hero[]> {
    return this._http.get<Hero[]>(this.baseUrl);
  }

  public getById(id: string): Observable<Hero | null> {
    return this._http
      .get<Hero>(`${this.baseUrl}/${id}`)
      .pipe(catchError(() => of(null)));
  }

  public addHero(hero: Hero): Observable<Hero> {
    return this._http.post<Hero>(this.baseUrl, hero);
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

  public getByFilter(filter: string | null): Observable<Hero[]> {
    return this._http.get<Hero[]>(`${this.baseUrl}?q=${filter}&_limit=10`);
  }
}
