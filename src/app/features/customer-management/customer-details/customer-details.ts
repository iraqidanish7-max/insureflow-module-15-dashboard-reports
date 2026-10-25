import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-customer-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './customer-details.html',
  styleUrl: './customer-details.css'
})
export class CustomerDetailsComponent {
  showForm = false;

  // Add this screen's UI state and event handlers here.
}
