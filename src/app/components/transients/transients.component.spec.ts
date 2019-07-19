import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransientsComponent } from './transients.component';

describe('TransientsComponent', () => {
  let component: TransientsComponent;
  let fixture: ComponentFixture<TransientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
