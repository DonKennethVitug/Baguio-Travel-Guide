import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TouristSpotsDetailsComponent } from './tourist-spots-details.component';

describe('TouristSpotsDetailsComponent', () => {
  let component: TouristSpotsDetailsComponent;
  let fixture: ComponentFixture<TouristSpotsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TouristSpotsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TouristSpotsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
