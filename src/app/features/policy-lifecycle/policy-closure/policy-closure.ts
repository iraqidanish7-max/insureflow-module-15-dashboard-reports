import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-policy-closure',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './policy-closure.html',
  styleUrl: './policy-closure.css'
})
export class PolicyClosureComponent {
  showForm = false;

  // Add this screen's UI state and event handlers here.
}
