import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesarrolladorPageComponent } from './desarrollador-page.component';

describe('DesarrolladorPageComponent', () => {
  let component: DesarrolladorPageComponent;
  let fixture: ComponentFixture<DesarrolladorPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesarrolladorPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesarrolladorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
