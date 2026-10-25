import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pay-premium',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pay-premium.html',
  styleUrl: './pay-premium.css'
})
export class PayPremiumComponent {
  showForm = false;

  // Add this screen's UI state and event handlers here.
}
