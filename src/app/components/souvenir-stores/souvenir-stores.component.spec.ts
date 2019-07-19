import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SouvenirStoresComponent } from './souvenir-stores.component';

describe('SouvenirStoresComponent', () => {
  let component: SouvenirStoresComponent;
  let fixture: ComponentFixture<SouvenirStoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SouvenirStoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SouvenirStoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
