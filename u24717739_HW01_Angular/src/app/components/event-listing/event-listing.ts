import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';          
import { EventService } from '../../services/event';
import { Event } from '../../models/event';

@Component({
  selector: 'app-event-listing',
  standalone: true,
  imports: [CommonModule, RouterLink],   
  templateUrl: './event-listing.html',
  styleUrls: ['./event-listing.css']
})
export class EventListingComponent implements OnInit {

  events: Event[] = [];

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents() {
    this.eventService.getEvents().subscribe(data => {
      this.events = data.reverse();
    });
  }

  deleteEvent(id: number) {
  if (confirm('Are you sure you want to delete this event?')) {
    this.eventService.deleteEvent(id).subscribe(() => {
      this.loadEvents();        
    });
  }

  }
}