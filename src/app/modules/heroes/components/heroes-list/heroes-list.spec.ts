import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HeroesList } from './heroes-list';
import { Hero, Publisher } from '../../entities';
import { MatPaginator } from '@angular/material/paginator';

describe('HeroesList', () => {
  let component: HeroesList;
  let fixture: ComponentFixture<HeroesList>;

  const heroes: Hero[] = [
    {
      id: 'dc-batman',
      superhero: 'Batman',
      publisher: Publisher.dc,
      alter_ego: '',
      first_appearance: '',
      characters: '',
    },
    {
      id: 'marvel-ironman',
      superhero: 'Iron Man',
      publisher: Publisher.marvel,
      alter_ego: '',
      first_appearance: '',
      characters: '',
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroesList, NoopAnimationsModule],
    })
      .overrideComponent(HeroesList, {
        set: { template: '<mat-paginator></mat-paginator>' },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroesList);
    fixture.componentRef.setInput('list', heroes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should expose default columns including actions', () => {
    expect(component.columnsToDisplay).toEqual([
      'superhero',
      'publisher',
      'alter_ego',
      'first_appearance',
      'characters',
      'actions',
    ]);
  });

  it('should set dataSource with initial list', () => {
    expect(component.dataSource.data).toEqual(heroes);
  });

  it('should update dataSource when list input changes', () => {
    const next = heroes.slice(0, 1);
    fixture.componentRef.setInput('list', next);
    fixture.detectChanges();
    expect(component.dataSource.data).toEqual(next);

    const third = heroes;
    fixture.componentRef.setInput('list', third);
    fixture.detectChanges();
    expect(component.dataSource.data).toEqual(third);
  });

  it('should connect paginator to dataSource', () => {
    expect(component.dataSource.paginator).toBeInstanceOf(MatPaginator);
  });

  it('should emit action with hero payload', (done) => {
    component.buttonAction.subscribe((evt) => {
      expect(evt).toEqual({ action: component.actions.Edit, hero: heroes[0] });
      done();
    });
    component.actionButton(component.actions.Edit, heroes[0]);
  });

  it('should emit action with null hero when not provided', (done) => {
    component.buttonAction.subscribe((evt) => {
      expect(evt).toEqual({ action: component.actions.Delete, hero: null });
      done();
    });
    component.actionButton(component.actions.Delete);
  });
});
