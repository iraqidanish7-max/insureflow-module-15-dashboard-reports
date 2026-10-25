import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-premium-schedule',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './premium-schedule.html',
  styleUrl: './premium-schedule.css'
})
export class PremiumScheduleComponent {
  showForm = false;

  // Add this screen's UI state and event handlers here.
}
