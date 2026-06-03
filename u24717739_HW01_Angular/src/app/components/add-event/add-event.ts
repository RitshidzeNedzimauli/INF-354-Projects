import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EventService } from '../../services/event';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-event',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-event.html',
  styleUrls: ['./add-event.css']
})
export class AddEventComponent {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private router: Router
  ) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      location: ['', Validators.required],
      ticketPrice: [0, [Validators.required, Validators.min(0)]]
    });
  }

  submit() {
    if (this.form.valid) {
      this.eventService.addEvent(this.form.value).subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Error adding event', err);
          alert('Failed to add event. Please try again.');
        }
      });
    }
  }

  cancel() {
    this.router.navigate(['/']);
  }
}