import { Injectable } from '@angular/core';
import { CanDeactivate, UrlTree } from '@angular/router';
import { HotelEditerComponent } from '../../hotel-editer/hotel-editer.component';

@Injectable({
  providedIn: 'root'
})
export class HotelEditGuard implements CanDeactivate<HotelEditerComponent> {
  canDeactivate(component: HotelEditerComponent): boolean | UrlTree {
      if (component.hotelForms.dirty) {
        const hotelName = component.hotelForms.get('nomHotels')!.value || 'Nouveau hotel';
        return confirm(`Voulez-vous annuler les changements éffectués sur ${hotelName}`);
      }
    return true;
  }
  
}
