import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-quote-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './quote-form.html',
  styleUrl: './quote-form.css'
})
export class QuoteFormComponent {
  showForm = false;

  // Add this screen's UI state and event handlers here.
}
