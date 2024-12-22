import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{
  
  constructor(private authService: AuthService, private router: Router) {} 
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean { 
    const expectedRoles = route.data['expectedRoles']; 
    // Modification pour plusieurs rôles 
    const token = this.authService.getToken(); 
    if (token) { 
      const decodedToken = this.authService.decodeToken(token); 
      const userRole = decodedToken.role; 
      if (Array.isArray(userRole)) { 
        // Vérifier si l'un des rôles utilisateur est dans les rôles attendus 
        return userRole.some((role: string) => expectedRoles.includes(role)); } 
        else { 
          // Vérifier si le rôle unique de l'utilisateur est dans les rôles attendus 
          return expectedRoles.includes(userRole); 
        }
       }
      this.router.navigate(['/login']); 
      return false; 
    }
}
