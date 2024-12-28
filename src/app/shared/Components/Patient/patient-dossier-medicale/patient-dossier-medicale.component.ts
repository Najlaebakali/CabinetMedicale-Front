import { Component } from '@angular/core';
import { PatientService } from '../../../services/patient.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-patient-dossier-medicale',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './patient-dossier-medicale.component.html',
  styleUrl: './patient-dossier-medicale.component.css'
})
export class PatientDossierMedicaleComponent {

  medicalRecord: any;

  constructor(private patientService: PatientService) {} 
  ngOnInit(): void {
  const patientId = 1; 
  this.patientService.getMedicalRecord(patientId).subscribe((data) => {
    this.medicalRecord = data;
    console.log('Dossier médical : ', this.medicalRecord);
  });
}

}
