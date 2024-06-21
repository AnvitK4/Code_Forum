import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseTopicComponent } from './browse-topic.component';

describe('BrowseTopicComponent', () => {
  let component: BrowseTopicComponent;
  let fixture: ComponentFixture<BrowseTopicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowseTopicComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BrowseTopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
