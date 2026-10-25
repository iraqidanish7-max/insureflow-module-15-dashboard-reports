import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-investigation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './investigation.html',
  styleUrl: './investigation.css'
})
export class InvestigationComponent {
  showForm = false;

  // Add this screen's UI state and event handlers here.
}
