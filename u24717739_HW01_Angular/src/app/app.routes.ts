import { Routes } from '@angular/router';
import { EventListingComponent } from './components/event-listing/event-listing';
import { AddEventComponent } from './components/add-event/add-event';
import { EditEventComponent } from './components/edit-event/edit-event';

export const routes: Routes = [
  { path: '', redirectTo: '/event-listing', pathMatch: 'full' },   
  { path: 'event-listing', component: EventListingComponent },     
  { path: 'add', component: AddEventComponent },
  { path: 'edit/:id', component: EditEventComponent },
  { path: '**', redirectTo: '/event-listing' }                    
];