import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarContactoPage } from './editar-contacto.page';

describe('EditarContactoPage', () => {
  let component: EditarContactoPage;
  let fixture: ComponentFixture<EditarContactoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarContactoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
