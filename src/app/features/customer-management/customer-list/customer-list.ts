import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './customer-list.html',
  styleUrl: './customer-list.css'
})
export class CustomerListComponent {
  showForm = false;

  // Add this screen's UI state and event handlers here.
}
