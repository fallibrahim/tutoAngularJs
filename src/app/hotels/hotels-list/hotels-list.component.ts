import { Component, OnInit } from "@angular/core";
import {Ihotel} from '../shared/models/hotel';
import { HotelListService } from "../shared/services/hotel-list.service";

@Component({
    selector:'app-hotel-list',
    templateUrl:'./hotels-list.component.html',
    styleUrls:['./hotel-list.component.css'] 
})
export class listHotelsComponent implements OnInit{
  public title : string = "liste d'hotels à Dakar";
  public hotels : Ihotel[] = [];
 
  public errMsg! : string;
  public showBadge: boolean = true;

public toggleIsNewBadge () : void { 
    this.showBadge = !this.showBadge;
}

private _hotelFilter = 'mot';

public constructor(private hotelListService:   HotelListService) {
    
}
public filteredHotels:Ihotel[] = [];
ngOnInit () {
      this.hotelListService.getHotels().subscribe({
      next : hotels => {
         this.hotels = hotels;
         this.filteredHotels = this.hotels;
      },
      error : err => this.errMsg = err

});
   
   this.hotelFilter  = "rechercher un hotel";
}
 public get hotelFilter () : string {
    return this._hotelFilter;
 }
 public set hotelFilter (filter : string) {
    this._hotelFilter = filter;
    this.filteredHotels = this._hotelFilter ? this.filterHotels(this._hotelFilter) : this.hotels;
 }
 public filterHotels (criteria : string) : Ihotel[] {
     criteria = criteria.toLocaleLowerCase();
      const res = this.hotels.filter(
        (hotel : Ihotel) => hotel.nomHotels.toLocaleLowerCase().indexOf(criteria) != -1
      );
      return res;
 }

 public receiveRating! : string;


 public receiveRatingClicked (message : string) {
    this.receiveRating = message;
 }

}