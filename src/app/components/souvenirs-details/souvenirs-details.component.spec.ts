import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SouvenirsDetailsComponent } from './souvenirs-details.component';

describe('SouvenirsDetailsComponent', () => {
  let component: SouvenirsDetailsComponent;
  let fixture: ComponentFixture<SouvenirsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SouvenirsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SouvenirsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
