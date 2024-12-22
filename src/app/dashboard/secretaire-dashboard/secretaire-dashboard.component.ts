import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { AuthService } from '../../shared/services/auth.service';

import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

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
