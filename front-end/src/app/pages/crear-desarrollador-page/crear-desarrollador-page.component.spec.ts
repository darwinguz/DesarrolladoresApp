import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearDesarrolladorPageComponent } from './crear-desarrollador-page.component';

describe('CrearDesarrolladorPageComponent', () => {
  let component: CrearDesarrolladorPageComponent;
  let fixture: ComponentFixture<CrearDesarrolladorPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearDesarrolladorPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearDesarrolladorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
