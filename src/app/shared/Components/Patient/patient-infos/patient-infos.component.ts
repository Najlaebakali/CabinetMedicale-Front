import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { AppointmentService } from '../../../services/appointment.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MedecinService } from '../../../services/medecin.service';

import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-patient-infos',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './patient-infos.component.html',
  styleUrl: './patient-infos.component.css'
})
export class PatientInfosComponent {
   constructor(private authService: AuthService, private router: Router, private appointmentService: AppointmentService, private snackBar: MatSnackBar, private medecinService: MedecinService
     ){}
     status = false;
     addToggle()
   {
     this.status = !this.status;       
   }
}
