import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodsDetailsComponent } from './foods-details.component';

describe('FoodsDetailsComponent', () => {
  let component: FoodsDetailsComponent;
  let fixture: ComponentFixture<FoodsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
