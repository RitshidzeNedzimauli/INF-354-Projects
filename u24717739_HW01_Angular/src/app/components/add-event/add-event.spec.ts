import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEventComponent } from './add-event';

describe('AddEvent', () => {
  let component: AddEventComponent;
  let fixture: ComponentFixture<AddEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEventComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddEventComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
