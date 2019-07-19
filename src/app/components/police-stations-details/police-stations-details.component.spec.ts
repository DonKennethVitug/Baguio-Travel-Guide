import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliceStationsDetailsComponent } from './police-stations-details.component';

describe('PoliceStationsDetailsComponent', () => {
  let component: PoliceStationsDetailsComponent;
  let fixture: ComponentFixture<PoliceStationsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoliceStationsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoliceStationsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
