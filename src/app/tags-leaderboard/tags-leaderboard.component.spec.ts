import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagsLeaderboardComponent } from './tags-leaderboard.component';

describe('TagsLeaderboardComponent', () => {
  let component: TagsLeaderboardComponent;
  let fixture: ComponentFixture<TagsLeaderboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TagsLeaderboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TagsLeaderboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
