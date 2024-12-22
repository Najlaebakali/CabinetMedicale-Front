import { Component } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router'; 
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  credentials = { email: '', password: '' }; 
  constructor(private authService: AuthService, private router: Router) {} 
  /*login(): void { 
    this.authService.login(this.credentials).subscribe( 
      (response: any) => { this.authService.saveToken(response.token); 
      const decodedToken = this.authService.decodeToken(response.token); 
      const role = decodedToken.role; // Assumant que le rôle est un seul string 
      this.redirectUser(role); 
    },
     error => { console.error('Login failed', error); 

     } );
    } */

    login(): void { 
      this.authService.login(this.credentials).subscribe( 
        (response: any) => { 
          this.authService.saveToken(response.token); 
          const decodedToken = this.authService.decodeToken(response.token); 
          console.log("Decoded Token:", decodedToken); // Ajoutez ceci pour vérifier le token décodé
          const role = decodedToken.role; // Assumant que le rôle est un seul string
          if (Array.isArray(role)) { // Ajoutez ceci pour vérifier si le rôle est un tableau
            this.redirectUser(role[0]); 
          } else {
            this.redirectUser(role);
          }
        },
        error => { 
          console.error('Login failed', error); 
        }
      );
    }
    
    redirectUser(role: string): void { 
      if (role === 'ADMIN' || role === 'admin' || role === 'Admin') { 
        this.router.navigate(['/admin-dashboard']); 
      } 
      else if (role === 'MEDECIN' || role === 'Medecin' || role === 'medecin') { 
        this.router.navigate(['/medecin-dashboard']); 
      }
     else if (role === 'SECRETAIRE' || role === 'SECRETAIRE' || role === 'SECRETAIRE') { 
      this.router.navigate(['/secretaire-dashboard']); 
    }
    else { this.router.navigate(['/']); 

    }
   }
   logout(): void { 
    this.authService.logout(); 
    this.router.navigate(['/login']); 
  } 

}
