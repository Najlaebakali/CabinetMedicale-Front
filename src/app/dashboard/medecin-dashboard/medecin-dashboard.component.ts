import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-medecin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './medecin-dashboard.component.html',
  styleUrl: './medecin-dashboard.component.css'
})
export class MedecinDashboardComponent {
  
  status = false;
  addToggle()
{
  this.status = !this.status;       
}

}
