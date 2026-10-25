import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-policy-renewal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './policy-renewal.html',
  styleUrl: './policy-renewal.css'
})
export class PolicyRenewalComponent {
  showForm = false;

  // Add this screen's UI state and event handlers here.
}
