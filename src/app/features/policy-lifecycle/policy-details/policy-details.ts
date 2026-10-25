import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-policy-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './policy-details.html',
  styleUrl: './policy-details.css'
})
export class PolicyDetailsComponent {
  showForm = false;

  // Add this screen's UI state and event handlers here.
}
