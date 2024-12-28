import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private readonly appointmentsUrl = 'http://127.0.0.1:5000/appointments/patient';
  private readonly medicalRecordUrl = 'http://localhost:8083/api/consultations/patient';
  // Injecting HttpClient
  constructor(private http: HttpClient) {}

  /**
   * Récupérer les rendez-vous d'un patient.
   * @param patientId 
   * @returns
   */
  getAppointments(patientId: number): Observable<any> {
    return this.http.get(`${this.appointmentsUrl}/${patientId}`);
  }

  /**
   * Récupérer le dossier médical d'un patient.
   * @param patientId 
   * @returns Un Observable contenant les informations du dossier médical.
   */
  getMedicalRecord(patientId: number): Observable<any> {
    return this.http.get(`${this.medicalRecordUrl}/${patientId}`);
  }

}