import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-underwriting-review',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './underwriting-review.html',
  styleUrl: './underwriting-review.css'
})
export class UnderwritingReviewComponent {
  showForm = false;

  // Add this screen's UI state and event handlers here.
}
