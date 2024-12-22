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
export const routes: Routes = [
   /* { path: "", redirectTo: "home", pathMatch: "full" },
    { path: "home", component: HomeComponent } ,
    { path: 'login', component: LoginComponent }, 
    { path: 'signup', component: SignupComponent }, 
    { path: 'admin-dashboard', component: AdminDashboardComponent}, 
    { path: 'medecin-dashboard', component: MedecinDashboardComponent}, 
    { path: 'secretaire-dashboard', component: SecretaireDashboardComponent },
    { path: 'medecins', component: MedecinListComponent }, 
    { path: 'patients', component: PatientListComponent }, 
    { path: 'secretaires', component: SecretaireListComponent },
    { path: 'dashboard', component: DashboardComponent }
];*/
{ path: "", redirectTo: "home", pathMatch: "full" }, 
{ path: "home", component: HomeComponent }, 
{ path: 'login', component: LoginComponent }, 
{ path: 'signup', component: SignupComponent }, 
{ path: 'admin-dashboard', component: AdminDashboardComponent, 
    canActivate: [AuthGuard], 
    data: { expectedRoles: ['ADMIN'] } }, 
{ path: 'medecin-dashboard', component: MedecinDashboardComponent, 
    canActivate: [AuthGuard], 
    data: { expectedRoles: ['Medecin'] } }, 
{ path: 'secretaire-dashboard', component: SecretaireDashboardComponent, 
    canActivate: [AuthGuard], 
    data: { expectedRoles: ['SECRETAIRE'] } }, 
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
