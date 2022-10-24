import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HotelDetailGuard implements CanActivate {

  constructor (private router : Router) {
    
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
        
    const id = +route.url[1].path;

    if(isNaN(id) || id <= 0) {
      alert("hotel introuvable");
      this.router.navigate(['/hotels']);
    }
    return true;
  }
  
}
