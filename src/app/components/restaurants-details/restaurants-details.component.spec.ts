import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantsDetailsComponent } from './restaurants-details.component';

describe('RestaurantsDetailsComponent', () => {
  let component: RestaurantsDetailsComponent;
  let fixture: ComponentFixture<RestaurantsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestaurantsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
