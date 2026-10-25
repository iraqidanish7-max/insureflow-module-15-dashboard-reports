import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-quote-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './quote-details.html',
  styleUrl: './quote-details.css'
})
export class QuoteDetailsComponent {
  showForm = false;

  // Add this screen's UI state and event handlers here.
}
