import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  user = { nom: '', prenom: '', email: '', password: '', role: '' }; 
  constructor(private authService: AuthService) {} 
  signup(): void { 
    this.authService.signup(this.user).subscribe( 
      response => 
        { 
          console.log('Signup successful', response); 

      },
       error => { console.error('Signup failed', error); } ); }

}
