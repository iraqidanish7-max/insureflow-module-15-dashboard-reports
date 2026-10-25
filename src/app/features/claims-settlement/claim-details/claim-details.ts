import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-claim-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './claim-details.html',
  styleUrl: './claim-details.css'
})
export class ClaimDetailsComponent {
  showForm = false;

  // Add this screen's UI state and event handlers here.
}
