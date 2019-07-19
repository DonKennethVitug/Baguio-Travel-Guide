import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GhostStoriesComponent } from './ghost-stories.component';

describe('GhostStoriesComponent', () => {
  let component: GhostStoriesComponent;
  let fixture: ComponentFixture<GhostStoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GhostStoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GhostStoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
