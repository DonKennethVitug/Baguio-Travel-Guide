import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelsModalComponent } from './hotels-modal.component';

describe('HotelsModalComponent', () => {
  let component: HotelsModalComponent;
  let fixture: ComponentFixture<HotelsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotelsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
