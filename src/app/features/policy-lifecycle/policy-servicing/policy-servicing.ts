import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-policy-servicing',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './policy-servicing.html',
  styleUrl: './policy-servicing.css'
})
export class PolicyServicingComponent {
  showForm = false;

  // Add this screen's UI state and event handlers here.
}
