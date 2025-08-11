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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should inject data', () => {
    expect(component.data).toEqual(mockHero as any);
  });

  it('should onNoClick close dialog with false', () => {
    component.onNoClick();
    expect(dialogRef.close).toHaveBeenCalledTimes(1);
    expect(dialogRef.close).toHaveBeenCalledWith(false);
  });

  it('should onNoClick close dialog with true', () => {
    component.onConfirm();
    expect(dialogRef.close).toHaveBeenCalledTimes(1);
    expect(dialogRef.close).toHaveBeenCalledWith(true);
  });
});
