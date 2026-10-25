import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-claim-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './claim-list.html',
  styleUrl: './claim-list.css'
})
export class ClaimListComponent {
  showForm = false;

  // Add this screen's UI state and event handlers here.
}
