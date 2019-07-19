import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaguioMapModalComponent } from './baguio-map-modal.component';

describe('BaguioMapModalComponent', () => {
  let component: BaguioMapModalComponent;
  let fixture: ComponentFixture<BaguioMapModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaguioMapModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaguioMapModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
