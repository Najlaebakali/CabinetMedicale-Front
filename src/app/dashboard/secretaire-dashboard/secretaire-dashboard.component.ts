import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
<<<<<<< HEAD
import { AuthService } from '../../shared/services/auth.service';

import { Router } from '@angular/router';
=======
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
>>>>>>> 53cf1840ca973507863d2d81b7e86807c411c0e9

@Component({
  selector: 'app-secretaire-dashboard',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './secretaire-dashboard.component.html',
  styleUrl: './secretaire-dashboard.component.css'
})
export class SecretaireDashboardComponent {
<<<<<<< HEAD

  

=======
  status = false;
  addToggle()
{
  this.status = !this.status;       
}
>>>>>>> 53cf1840ca973507863d2d81b7e86807c411c0e9
}
