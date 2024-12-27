import { Component } from '@angular/core';
import { AppointmentService } from '../../../services/appointment.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MedecinService } from '../../../services/medecin.service';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-manage-appointments',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './manage-appointments.component.html',
  styleUrl: './manage-appointments.component.css'
})
export class ManageAppointmentsComponent {
  appointments: any[] = [];
  doctorId: number | null = null;
  selectedAppointment: any = null;
  dateToDelete: string = ''; // Date à supprimer (format "YYYY-MM-DD")
  doctors: any[] = []; 

  status = false;
  addToggle()
{
  this.status = !this.status;       
}


  constructor(
    private authService: AuthService, 
    private router: Router,
    private appointmentService: AppointmentService, private snackBar: MatSnackBar, private medecinService: MedecinService
  ) {}

  ngOnInit(): void {
    this.loadAppointments();
    this.medecinService.loadMedecins();

  }
  get doctorsList() {
    return this.medecinService.medecins;
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

  // Charger les rendez-vous par médecin
  loadAppointmentsByDoctorId(): void {
    if (this.doctorId) {
      this.appointmentService.getAppointmentsByDoctorId(this.doctorId).subscribe(
        (response) => {
          this.appointments = response;
          console.log(response);
        },
        (error) => {
          console.error('Erreur lors de la récupération des rendez-vous pour ce médecin', error);
          this.snackBar.open('Erreur lors de la récupération des rendez-vous pour ce médecin', 'Fermer', { duration: 3000 });
        }
      );
    } else {
      this.loadAppointments();
    }
  }


  // Supprimer un rendez-vous
  deleteAppointment(appointmentId: number): void {
    this.appointmentService.deleteAppointment(appointmentId).subscribe(
      (response) => {
        this.snackBar.open('Rendez-vous supprimé avec succès', 'Fermer', { duration: 3000 });
        this.loadAppointments(); // Recharger les rendez-vous après la suppression
      },
      (error) => {
        console.error('Erreur lors de la suppression du rendez-vous', error);
        this.snackBar.open('Erreur lors de la suppression du rendez-vous', 'Fermer', { duration: 3000 });
      }
    );
  }

  // Mettre à jour un rendez-vous
  updateAppointment(appointmentId: number, updatedData: any): void {
    this.appointmentService.updateAppointment(appointmentId, updatedData).subscribe(
      (response) => {
        this.snackBar.open('Rendez-vous mis à jour avec succès', 'Fermer', { duration: 3000 });
        this.loadAppointments(); // Recharger les rendez-vous après la mise à jour
      },
      (error) => {
        console.error('Erreur lors de la mise à jour du rendez-vous', error);
        this.snackBar.open('Erreur lors de la mise à jour du rendez-vous', 'Fermer', { duration: 3000 });
      }
    );
  }
  // Supprimer les rendez-vous par date
  deleteAppointmentsByDate(): void {
    if (!this.dateToDelete) {
      this.snackBar.open('Veuillez spécifier une date.', 'Fermer', { duration: 3000 });
      return;
    }
    this.appointmentService.deleteAppointmentsByDate(this.dateToDelete).subscribe(
      (response) => {
        this.snackBar.open('Rendez-vous supprimés avec succès.', 'Fermer', { duration: 3000 });
        this.loadAppointments(); 
      },
      (error) => {
        console.error('Erreur lors de la suppression des rendez-vous', error);
        this.snackBar.open('Erreur lors de la suppression des rendez-vous.', 'Fermer', { duration: 3000 });
      }
    );
  }


   // Sélectionner un rendez-vous pour l'édition
   editAppointment(appointment: any): void {
    this.selectedAppointment = { ...appointment }; // Faire une copie pour éviter les modifications directes
  }

  // Annuler l'édition
  cancelEdit(): void {
    this.selectedAppointment = null; // Réinitialiser l'édition
  }

  // Sauvegarder le rendez-vous modifié
  saveAppointment(): void {
    if (this.selectedAppointment) {
      this.appointmentService.updateAppointment(this.selectedAppointment.id, this.selectedAppointment).subscribe(
        (response) => {
          this.snackBar.open('Rendez-vous mis à jour avec succès', 'Fermer', { duration: 3000 });
          this.loadAppointments(); // Recharger les rendez-vous après la mise à jour
          this.selectedAppointment = null; // Réinitialiser l'édition
        },
        (error) => {
          console.error('Erreur lors de la mise à jour du rendez-vous', error);
          this.snackBar.open('Erreur lors de la mise à jour du rendez-vous', 'Fermer', { duration: 3000 });
        }
      );
    }
  }

  logout(): void { 
    const confirmation = confirm('Voulez-vous vraiment vous déconnecter ?'); 
    if (confirmation) { 
      this.authService.logout(); 
      this.router.navigate(['/login']);
     }
     }
}
