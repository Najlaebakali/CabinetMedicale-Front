import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { AppointmentService } from '../../shared/services/appointment.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MedecinService } from '../../shared/services/medecin.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  medecins: any[] = [];
  //patients: any[] = [];
  secretaires: any[] = [];
  status = false;
  totalMedecins = 0; 
  totalSecretaires = 0
  appointments: any[] = [];
  doctorId: number | null = null;
  selectedAppointment: any = null;
  dateToDelete: string = ''; // Date à supprimer (format "YYYY-MM-DD")
  doctors: any[] = []; 
  totalAppointments: number = 0;

  constructor(private apollo: Apollo, private authService: AuthService, private router: Router,private appointmentService: AppointmentService, private snackBar: MatSnackBar, private medecinService: MedecinService) {}


  ngOnInit() {
    this.loadMedecins();
    //this.loadPatients();
    this.loadSecretaires();
    this.loadTotalMedecins(); 
    this.loadTotalSecretaires();
    this.loadAppointments();

    this.appointmentService.getTotalAppointments().subscribe( (data) => { this.totalAppointments = data; }, (error) => { console.error('Error fetching total appointments', error); } );
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
  loadTotalMedecins() { 
    const GET_TOTAL_MEDECINS = gql` query { findAllMedecins { id } } `; 
    this.apollo.watchQuery<any>({ 
      query: GET_TOTAL_MEDECINS }).valueChanges.subscribe(result => {
         this.totalMedecins = result?.data?.findAllMedecins.length; }); 
        }
  loadTotalSecretaires() { 
    const GET_TOTAL_SECRETARIES = gql` query { findAllSecretaires { id } } `; 
    this.apollo.watchQuery<any>({ query: GET_TOTAL_SECRETARIES }).valueChanges.subscribe(result => { 
      this.totalSecretaires = result?.data?.findAllSecretaires.length;
    }); 
    }

  addToggle() {
    this.status = !this.status;
  }

  loadMedecins() {
    const GET_MEDECINS = gql`
      query {
        findAllMedecins {
          id
          nom
          prenom
          email
          role
          label
        }
      }
    `;

    this.apollo.watchQuery<any>({
      query: GET_MEDECINS
    }).valueChanges.subscribe(result => {
      this.medecins = result?.data?.findAllMedecins;
    });
  }

  /*loadPatients() {
    const GET_PATIENTS = gql`
      query {
        findAllUsers {
          id
          nom
          prenom
          email
          role
        }
      }
    `;

    this.apollo.watchQuery<any>({
      query: GET_PATIENTS
    }).valueChanges.subscribe(result => {
      this.patients = result?.data?.findAllUsers.filter((user: any) => user.role === 'patient');
    });
  }*/

  loadSecretaires() {
    const GET_SECRETARIES = gql`
      query {
        findAllSecretaires {
          id
          nom
          prenom
          email
          role
          label
        }
      }
    `;

    this.apollo.watchQuery<any>({
      query: GET_SECRETARIES
    }).valueChanges.subscribe(result => {
      this.secretaires = result?.data?.findAllSecretaires;
    });
  }

  logout(): void { 
    const confirmation = confirm('Voulez-vous vraiment vous déconnecter ?'); 
    if (confirmation) { 
      this.authService.logout(); 
      this.router.navigate(['/login']);
     }
     }
}
