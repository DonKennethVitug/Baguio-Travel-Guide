import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BotNavComponent } from './bot-nav.component';

describe('BotNavComponent', () => {
  let component: BotNavComponent;
  let fixture: ComponentFixture<BotNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BotNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BotNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
