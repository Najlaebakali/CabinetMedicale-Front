import { Component } from '@angular/core';
import { PatientService } from '../../../services/patient.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-patient-appointments',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './patient-appointments.component.html',
  styleUrl: './patient-appointments.component.css'
})
export class PatientAppointmentsComponent {

  appointments: any;

  constructor(private patientService: PatientService) {}

  ngOnInit(): void {
    const patientId = 1; // Exemple d'ID patient

    // Récupérer les rendez-vous
    this.patientService.getAppointments(patientId).subscribe((data) => {
      this.appointments = data;
      console.log('Rendez-vous : ', this.appointments);
    });
}

}
