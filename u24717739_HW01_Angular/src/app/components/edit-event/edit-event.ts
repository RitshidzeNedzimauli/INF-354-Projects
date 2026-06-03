import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../services/event';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-event',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-event.html',
  styleUrls: ['./edit-event.css']
})
export class EditEventComponent implements OnInit {

  form!: FormGroup;
  id!: number;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    if (isNaN(this.id)) {
      this.router.navigate(['/']);
      return;
    }

    this.eventService.getEvent(this.id).subscribe({
      next: (event) => {
        this.form = this.fb.group({
          id: [event.id],
          title: [event.title, Validators.required],
          location: [event.location, Validators.required],
          ticketPrice: [event.ticketPrice, [Validators.required, Validators.min(0)]]
        });
      },
      error: (err) => {
        console.error('Error loading event', err);
        alert('Event not found or error loading data.');
        this.router.navigate(['/']);
      }
    });
  }

  submit() {
    if (this.form.valid) {
      this.eventService.updateEvent(this.form.value).subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Error updating event', err);
          alert('Failed to update event. Please try again.');
        }
      });
    }
  }

  cancel() {
    this.router.navigate(['/']);
  }
}