import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-policy-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './policy-list.html',
  styleUrl: './policy-list.css'
})
export class PolicyListComponent {
  showForm = false;

  // Add this screen's UI state and event handlers here.
}
