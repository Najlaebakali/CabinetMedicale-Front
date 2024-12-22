import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appointment } from './../models/Appointment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private apiUrl = 'http://127.0.0.1:5000/appointments';

  constructor(private http: HttpClient) {}

  createAppointment(appointment: Appointment): Observable<Appointment> {
    return this.http.post<Appointment>(this.apiUrl, appointment);
  }

  getAllAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.apiUrl}`);
  }

  getAppointmentById(id: number): Observable<Appointment> {
    return this.http.get<Appointment>(`${this.apiUrl}/${id}`);
  }
   // Obtenir les rendez-vous d'un médecin par ID
   getAppointmentsByDoctorId(doctorId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/medecin/${doctorId}`);
  }

  deleteAppointment(appointmentId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${appointmentId}`);
  }

  // Mettre à jour un rendez-vous
  updateAppointment(appointmentId: number, updatedData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${appointmentId}`, updatedData);
  }

   // Supprimer les rendez-vous par date
  deleteAppointmentsByDate(date: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete_by_date?date=${date}`);
  }

}
