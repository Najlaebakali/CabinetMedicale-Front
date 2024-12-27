import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { AuthService } from '../../shared/services/auth.service';

import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppointmentService } from '../../shared/services/appointment.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MedecinService } from '../../shared/services/medecin.service';

@Component({
  selector: 'app-secretaire-dashboard',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './secretaire-dashboard.component.html',
  styleUrl: './secretaire-dashboard.component.css'
})
export class SecretaireDashboardComponent {
  totalAppointments: number = 0;
  appointments: any[] = [];
  doctorId: number | null = null;
  selectedAppointment: any = null;
  dateToDelete: string = ''; // Date à supprimer (format "YYYY-MM-DD")
  doctors: any[] = []; 


  
constructor(private authService: AuthService, private router: Router, private appointmentService: AppointmentService, private snackBar: MatSnackBar, private medecinService: MedecinService
 ){}

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
  this.loadAppointments();
}

 // Charger tous les rendez-vous
 loadAppointments(): void {
  this.appointmentService.getAllAppointments().subscribe(
    (response) => {
      this.appointments = response;
    },
    (error) => {
      console.error('Erreur lors de la récupération des rendez-vous', error);
      this.snackBar.open('Erreur lors de la récupération des rendez-vous', 'Fermer', { duration: 3000 });
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
