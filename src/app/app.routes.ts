import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminDashboardComponent } from './dashboard/admin-dashboard/admin-dashboard.component';
import { MedecinDashboardComponent } from './dashboard/medecin-dashboard/medecin-dashboard.component';
import { SecretaireDashboardComponent } from './dashboard/secretaire-dashboard/secretaire-dashboard.component';
import { MedecinListComponent } from './dashboard/admin-dashboard/medecin-list/medecin-list.component';
import { PatientListComponent } from './dashboard/admin-dashboard/patient-list/patient-list.component';
import { SecretaireListComponent } from './dashboard/admin-dashboard/secretaire-list/secretaire-list.component';

import { AuthGuardService as AuthGuard } from './shared/services/auth-guard.service';

import { CreateAppointmentComponent } from './shared/Components/Secretaire/create-appointment/create-appointment.component';
import { ManageAppointmentsComponent } from './shared/Components/Secretaire/manage-appointments/manage-appointments.component'
import { PatientRecordsComponent } from './shared/Components/Secretaire/patient-records/patient-records.component';
import { PatientDashboardComponent } from './dashboard/patient-dashboard/patient-dashboard/patient-dashboard.component';
import { PatientAppointmentsComponent } from './shared/Components/Patient/patient-appointments/patient-appointments.component';
import { PatientDossierMedicaleComponent } from './shared/Components/Patient/patient-dossier-medicale/patient-dossier-medicale.component';
import { PatientInfosComponent } from './shared/Components/Patient/patient-infos/patient-infos.component';

export const routes: Routes = [
   /* { path: "", redirectTo: "home", pathMatch: "full" },
    { path: "home", component: HomeComponent } ,
    { path: 'login', component: LoginComponent }, 
    { path: 'signup', component: SignupComponent }, 
    { path: 'admin-dashboard', component: AdminDashboardComponent}, 
    { path: 'medecin-dashboard', component: MedecinDashboardComponent}, 
    { path: "secretaire-dashboard", component: SecretaireDashboardComponent, children: [
        { path: "create-appointment", component: CreateAppointmentComponent },
        { path: "manage-appointments", component: ManageAppointmentsComponent },
        { path: "patient-records", component: PatientRecordsComponent }
      ]
    },
    { path: 'medecins', component: MedecinListComponent }, 
    { path: 'patients', component: PatientListComponent }, 
    { path: 'secretaires', component: SecretaireListComponent },
    { path: 'dashboard', component: DashboardComponent }
];*/
{ path: "", redirectTo: "home", pathMatch: "full" }, 
{ path: "home", component: HomeComponent }, 
{ 
    path: 'patient-dashboard', 
    component: PatientDashboardComponent,
    canActivate: [AuthGuard], // Pas de rôles requis pour le tableau de bord
    children: [
      { path: "patient-appointments", component: PatientAppointmentsComponent },
      { path: "patient-dossier-medicale", component: PatientDossierMedicaleComponent },
      { path: "patient-infos", component: PatientInfosComponent }
    ]
},
{ path: 'login', component: LoginComponent }, 
{ path: 'signup', component: SignupComponent },
{ path: 'admin-dashboard', component: AdminDashboardComponent, 
    canActivate: [AuthGuard], 
    data: { expectedRoles: ['ADMIN'] } }, 
{ path: 'medecin-dashboard', component: MedecinDashboardComponent, 
    canActivate: [AuthGuard], 
    data: { expectedRoles: ['MEDECIN'] } }, 
{ path: 'secretaire-dashboard', component: SecretaireDashboardComponent, children: [
    //{ path: "create-appointment", component: CreateAppointmentComponent },
    //{ path: "manage-appointments", component: ManageAppointmentsComponent },
    { path: "patient-records", component: PatientRecordsComponent }
  ],

    canActivate: [AuthGuard], 
    data: { expectedRoles: ['SECRETAIRE'] } },
    { path: 'create-appointment', component: CreateAppointmentComponent, 
       canActivate: [AuthGuard], data: { expectedRoles: ['SECRETAIRE'] } 
    }, 
    { path: 'manage-appointments', component: ManageAppointmentsComponent, 
        canActivate: [AuthGuard], data: { expectedRoles: ['SECRETAIRE'] } 
     },
{ path: 'medecins', component: MedecinListComponent, 
    canActivate: [AuthGuard], 
    data: { expectedRoles: ['ADMIN'] } }, 
{ path: 'patients', component: PatientListComponent, 
    canActivate: [AuthGuard], 
    data: { expectedRoles: ['ADMIN'] } }, 
{ path: 'secretaires', component: SecretaireListComponent, 
    canActivate: [AuthGuard], 
    data: { expectedRoles: ['ADMIN', 'MEDECIN'] } }, 
{ path: 'dashboard', component: DashboardComponent } ];
