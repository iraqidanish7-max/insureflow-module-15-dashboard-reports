import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './customer-form.html',
  styleUrl: './customer-form.css'
})
export class CustomerFormComponent {
  showForm = false;

  // Add this screen's UI state and event handlers here.
}
