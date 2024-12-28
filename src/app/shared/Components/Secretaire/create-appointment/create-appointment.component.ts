import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';  // Import ReactiveFormsModule
import { AppointmentService } from '../../../services/appointment.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MedecinService } from '../../../services/medecin.service';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-create-appointment',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './create-appointment.component.html',
  styleUrl: './create-appointment.component.css'
})
export class CreateAppointmentComponent {
  appointmentForm: FormGroup;
  doctors: any[] = [];
  
  status = false;
  addToggle()
{
  this.status = !this.status;       
}
  constructor(
    private authService: AuthService, 
    private router: Router,
    private fb: FormBuilder,
    private appointmentService: AppointmentService,
    private _snackBar: MatSnackBar,
    private medecinService: MedecinService
  ) {
    this.appointmentForm = this.fb.group({
      patient_name: ['', [Validators.required, Validators.minLength(2)]],
      doctor_id: ['', [Validators.required, Validators.min(1)]],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      notes: [''],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone_number: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      gender: ['', Validators.required],
      is_cancelled: [false],
    });
  }


  ngOnInit(): void {
    // Fetch the list of doctors when the component initializes
    this.medecinService.loadMedecins();
  }

  // Load doctors from MedecinService
  get doctorsList() {
    return this.medecinService.medecins;
  }

  createAppointment() {
    if (this.appointmentForm.valid) {
      const appointmentData = this.appointmentForm.value;
      this.appointmentService.createAppointment(appointmentData).subscribe(
        (response: any) => { // Replace `any` with the proper type if known
          
          console.log('Appointment created successfully:', response);
          this._snackBar.open('Appointment created successfully!', 'Close', { duration: 3000 });
          this.appointmentForm.reset();

        },
        (error: any) => { // Replace `any` with a proper type if known
          console.error('Error creating appointment:', error);
          this._snackBar.open('Failed to create appointment. Please try again.', 'Close', { duration: 3000 });
        }
      );
    } else {
      console.error('Form is invalid');
      this._snackBar.open('Please fill all required fields correctly.', 'Close', { duration: 3000 });
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