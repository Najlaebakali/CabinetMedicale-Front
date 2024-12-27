import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { AuthService } from '../../shared/services/auth.service';

import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppointmentService } from '../../shared/services/appointment.service';

@Component({
  selector: 'app-secretaire-dashboard',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './secretaire-dashboard.component.html',
  styleUrl: './secretaire-dashboard.component.css'
})
export class SecretaireDashboardComponent {
  totalAppointments: number = 0;

  
constructor(private authService: AuthService, private router: Router, private appointmentService: AppointmentService){}

  status = false;
  addToggle()
{
  this.status = !this.status;       
}

ngOnInit(): void {
   this.appointmentService.getTotalAppointments().subscribe( 
    (data) => { 
      this.totalAppointments = data; 
    }, 
    (error) => { console.error('Error fetching total appointments', error); 

    } 
  ); 
}

logout(): void { 
  const confirmation = confirm('Voulez-vous vraiment vous déconnecter ?'); 
  if (confirmation) { 
    this.authService.logout(); 
    this.router.navigate(['/login']);
   }
   }
}
