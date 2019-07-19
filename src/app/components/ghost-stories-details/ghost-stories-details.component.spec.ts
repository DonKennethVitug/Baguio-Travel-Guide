import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GhostStoriesDetailsComponent } from './ghost-stories-details.component';

describe('GhostStoriesDetailsComponent', () => {
  let component: GhostStoriesDetailsComponent;
  let fixture: ComponentFixture<GhostStoriesDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GhostStoriesDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GhostStoriesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
