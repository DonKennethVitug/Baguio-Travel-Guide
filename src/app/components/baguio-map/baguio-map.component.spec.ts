import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaguioMapComponent } from './baguio-map.component';

describe('BaguioMapComponent', () => {
  let component: BaguioMapComponent;
  let fixture: ComponentFixture<BaguioMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaguioMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaguioMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
