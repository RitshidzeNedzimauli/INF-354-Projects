import { Event } from './event';

describe('Event', () => {
  it('should define the Event interface correctly', () => {
    const event: Event = {
      id: 1,
      title: 'Test Event',
      location: 'Test Location',
      ticketPrice: 50
    };

    expect(event).toBeDefined();
  });
});