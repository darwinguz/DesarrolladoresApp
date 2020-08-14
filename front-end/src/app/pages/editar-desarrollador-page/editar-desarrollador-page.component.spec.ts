import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarDesarrolladorPageComponent } from './editar-desarrollador-page.component';

describe('EditarDesarrolladorPageComponent', () => {
  let component: EditarDesarrolladorPageComponent;
  let fixture: ComponentFixture<EditarDesarrolladorPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarDesarrolladorPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarDesarrolladorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
