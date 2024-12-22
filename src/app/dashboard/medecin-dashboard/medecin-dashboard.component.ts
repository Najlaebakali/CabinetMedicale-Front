import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';

import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-medecin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterLink],
  templateUrl: './medecin-dashboard.component.html',
  styleUrl: './medecin-dashboard.component.css'
})
export class MedecinDashboardComponent {

  constructor(private authService: AuthService, private router: Router){}
  
  status = false;
  addToggle()
{
  this.status = !this.status;       
}
logout(): void { 
  const confirmation = confirm('Voulez-vous vraiment vous déconnecter ?'); 
  if (confirmation) { 
    this.authService.logout(); 
    this.router.navigate(['/login']);
   }
   }

}
