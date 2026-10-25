import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-kyc-review',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './kyc-review.html',
  styleUrl: './kyc-review.css'
})
export class KycReviewComponent {
  showForm = false;

  // Add this screen's UI state and event handlers here.
}
