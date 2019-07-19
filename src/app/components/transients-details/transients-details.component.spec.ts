import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransientsDetailsComponent } from './transients-details.component';

describe('TransientsDetailsComponent', () => {
  let component: TransientsDetailsComponent;
  let fixture: ComponentFixture<TransientsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransientsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransientsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
