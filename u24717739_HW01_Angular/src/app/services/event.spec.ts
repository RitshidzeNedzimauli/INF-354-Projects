import { Event } from '../models/event';

describe('Event Model', () => {
  
  it('should create an Event object correctly', () => {
    const event: Event = {
      id: 1,
      title: 'Tech Workshop',
      location: 'Lab A',
      ticketPrice: 75
    };

    expect(event).toBeTruthy();
    expect(event.id).toBe(1);
    expect(event.title).toBe('Tech Workshop');
    expect(event.location).toBe('Lab A');
    expect(event.ticketPrice).toBe(75);
  });

  it('should allow free events (ticketPrice = 0)', () => {
    const freeEvent: Event = {
      id: 2,
      title: 'Startup Pitch',
      location: 'Auditorium',
      ticketPrice: 0
    };

    expect(freeEvent.ticketPrice).toBe(0);
    expect(freeEvent.title).toBe('Startup Pitch');
  });

});