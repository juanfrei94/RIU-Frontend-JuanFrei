import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Dialog } from './dialog';
import { Hero } from '../../../modules/heroes/entities';

describe('Dialog', () => {
  let fixture: ComponentFixture<Dialog>;
  let component: Dialog;
  let dialogRef: jasmine.SpyObj<MatDialogRef<Dialog>>;

  const mockHero: Partial<Hero> = {
    id: 'dc-batman',
    superhero: 'batman',
  };

  beforeEach(async () => {
    dialogRef = jasmine.createSpyObj<MatDialogRef<Dialog>>('MatDialogRef', [
      'close',
    ]);

    await TestBed.configureTestingModule({
      imports: [Dialog],
      providers: [
        { provide: MatDialogRef, useValue: dialogRef },
        { provide: MAT_DIALOG_DATA, useValue: mockHero },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Dialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crearse', () => {
    expect(component).toBeTruthy();
  });

  it('debería inyectar los datos del héroe', () => {
    expect(component.data).toEqual(mockHero as any);
  });

  it('onNoClick debería cerrar el diálogo con false', () => {
    component.onNoClick();
    expect(dialogRef.close).toHaveBeenCalledTimes(1);
    expect(dialogRef.close).toHaveBeenCalledWith(false);
  });

  it('onConfirm debería cerrar el diálogo con true', () => {
    component.onConfirm();
    expect(dialogRef.close).toHaveBeenCalledTimes(1);
    expect(dialogRef.close).toHaveBeenCalledWith(true);
  });
});
