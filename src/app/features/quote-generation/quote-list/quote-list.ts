import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-quote-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './quote-list.html',
  styleUrl: './quote-list.css'
})
export class QuoteListComponent {
  showForm = false;

  // Add this screen's UI state and event handlers here.
}
