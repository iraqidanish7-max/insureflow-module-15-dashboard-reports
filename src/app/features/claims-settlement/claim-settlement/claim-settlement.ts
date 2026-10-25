import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-claim-settlement',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './claim-settlement.html',
  styleUrl: './claim-settlement.css'
})
export class ClaimSettlementComponent {
  showForm = false;

  // Add this screen's UI state and event handlers here.
}
