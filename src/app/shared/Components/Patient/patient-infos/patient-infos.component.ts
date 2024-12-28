import { Component } from '@angular/core';
import { PatientService } from '../../../services/patient.service';

@Component({
  selector: 'app-patient-infos',
  standalone: true,
  imports: [],
  templateUrl: './patient-infos.component.html',
  styleUrl: './patient-infos.component.css'
})
export class PatientInfosComponent {

  patientInfo: any;

  constructor(private patientService: PatientService) {}


}
