import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HeroesPage } from './heroes-page';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { HeroesService } from '../../infrastructure';
import { Actions, Hero, Publisher } from '../../entities';
import { Dialog } from '../../../../shared/components';

describe('HeroesPage', () => {
  let component: HeroesPage;
  let fixture: ComponentFixture<HeroesPage>;
  let router: jasmine.SpyObj<Router>;
  let dialog: jasmine.SpyObj<MatDialog>;
  let service: jasmine.SpyObj<HeroesService>;

  const hero: Hero = {
    id: 'dc-batman',
    superhero: 'Batman',
    publisher: Publisher.dc,
    alter_ego: '',
    first_appearance: '',
    characters: '',
  };

  beforeEach(async () => {
    router = jasmine.createSpyObj('Router', ['navigate']);
    dialog = jasmine.createSpyObj('MatDialog', ['open']);
    service = jasmine.createSpyObj('HeroesService', ['getAll', 'removeById']);
    service.getAll.and.returnValue(of([]));
    service.removeById.and.returnValue(of(true));

    await TestBed.configureTestingModule({
      imports: [HeroesPage],
      providers: [
        { provide: Router, useValue: router },
        { provide: MatDialog, useValue: dialog },
        { provide: HeroesService, useValue: service },
      ],
    })
      .overrideComponent(HeroesPage, { set: { template: '' } })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getAll on construction', () => {
    expect(service.getAll).toHaveBeenCalledTimes(1);
  });

  it('should navigate to create page on Create action', () => {
    component.trigger({ action: Actions.Create });
    expect(router.navigate).toHaveBeenCalledWith(['heroes', 'new']);
  });

  it('should navigate to edit page on Edit action with id', () => {
    component.trigger({ action: Actions.Edit, hero });
    expect(router.navigate).toHaveBeenCalledWith(['heroes', hero.id]);
  });

  it('should not navigate on Edit action without id', () => {
    component.trigger({ action: Actions.Edit, hero: { ...hero, id: '' } });
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should open dialog and delete on confirm', () => {
    dialog.open.and.returnValue({ afterClosed: () => of(true) } as any);
    component.trigger({ action: Actions.Delete, hero });
    expect(dialog.open).toHaveBeenCalledWith(Dialog, { data: hero });
    expect(service.removeById).toHaveBeenCalledWith(hero.id);
    expect(service.getAll).toHaveBeenCalledTimes(2);
  });

  it('should not delete when dialog returns false', () => {
    dialog.open.and.returnValue({ afterClosed: () => of(false) } as any);
    component.trigger({ action: Actions.Delete, hero });
    expect(service.removeById).not.toHaveBeenCalled();
    expect(service.getAll).toHaveBeenCalledTimes(1);
  });

  it('should not refresh list when removeById returns false', () => {
    dialog.open.and.returnValue({ afterClosed: () => of(true) } as any);
    service.removeById.and.returnValue(of(false));
    component.trigger({ action: Actions.Delete, hero });
    expect(service.removeById).toHaveBeenCalledWith(hero.id);
    expect(service.getAll).toHaveBeenCalledTimes(1);
  });
});
