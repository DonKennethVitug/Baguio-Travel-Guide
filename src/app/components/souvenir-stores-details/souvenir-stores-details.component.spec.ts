import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SouvenirStoresDetailsComponent } from './souvenir-stores-details.component';

describe('SouvenirStoresDetailsComponent', () => {
  let component: SouvenirStoresDetailsComponent;
  let fixture: ComponentFixture<SouvenirStoresDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SouvenirStoresDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SouvenirStoresDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
