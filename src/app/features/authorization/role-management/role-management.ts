import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-role-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './role-management.html',
  styleUrl: './role-management.css'
})
export class RoleManagementComponent {
  showForm = false;

  // Add this screen's UI state and event handlers here.
}
