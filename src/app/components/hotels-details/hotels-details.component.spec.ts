import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelsDetailsComponent } from './hotels-details.component';

describe('HotelsDetailsComponent', () => {
  let component: HotelsDetailsComponent;
  let fixture: ComponentFixture<HotelsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotelsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
