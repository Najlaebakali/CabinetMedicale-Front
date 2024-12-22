import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-secretaire-dashboard',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './secretaire-dashboard.component.html',
  styleUrl: './secretaire-dashboard.component.css'
})
export class SecretaireDashboardComponent {
  status = false;
  addToggle()
{
  this.status = !this.status;       
}
}
