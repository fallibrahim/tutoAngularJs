import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ihotel } from '../shared/models/hotel';
import { HotelListService } from '../shared/services/hotel-list.service';

@Component({
  selector: 'app-hotel-detail',
  templateUrl: './hotel-detail.component.html',
  styleUrls: ['./hotel-detail.component.css']
})
export class HotelDetailComponent implements OnInit {
  public hotel : Ihotel = <Ihotel>{}
  constructor(
    private route : ActivatedRoute,
    
    private hotelService : HotelListService,

    private router : Router
    ) { } 

  ngOnInit(): void {
        
    const id: number  = +this.route.snapshot.paramMap.get('id')!;
    
    this.hotelService.getHotels().subscribe((hotels : Ihotel[]) => {
    this.hotel = hotels.find((hotel:Ihotel) => hotel.id === id)!;
    console.log("hotel: ", this.hotel);
    });
    
  }
    public backToList() : void {
      this.router.navigate(['/hotels']);
    }
}
