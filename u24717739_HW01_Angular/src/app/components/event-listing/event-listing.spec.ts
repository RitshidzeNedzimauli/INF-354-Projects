import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventListingComponent } from './event-listing';

describe('EventListing', () => {
  let component: EventListingComponent;
  let fixture: ComponentFixture<EventListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventListingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EventListingComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
