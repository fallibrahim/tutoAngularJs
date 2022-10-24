import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/Forms';
import { CommonModule, registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import {HttpClientModule} from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';


import { HomeComponent } from './home/home.component';
import { ReplaceComma } from './shared/pipes/replace-comma.pipes';
import { listHotelsComponent } from './hotels/hotels-list/hotels-list.component';
import { HotelDetailComponent } from './hotels/hotel-detail/hotel-detail.component';
import { StartRatingComponent } from './shared/components/start-rating/start-rating.component';
import { HotelDetailGuard } from './hotels/shared/guards/hotel-detail.guard';
import { HotelListService } from './hotels/shared/services/hotel-list.service';
import { HotelEditerComponent } from './hotels/hotel-editer/hotel-editer.component';
import { HotelEditGuard } from './hotels/shared/guards/hotel-edit.guard';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { HotelData } from './hotels/shared/api/angularHotelData';

registerLocaleData(localeFr, 'fr')
@NgModule({
  declarations: [
    AppComponent,
    listHotelsComponent,
    StartRatingComponent,
    ReplaceComma,
    HomeComponent,
    HotelDetailComponent,
    HotelEditerComponent
    
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path:'home' , component: HomeComponent },
      { path:'' , redirectTo :'home', pathMatch:'full' },
      { path:'hotels/:id' , component:HotelDetailComponent,
      canActivate: [HotelDetailGuard]
     },
     { path:'hotels' , component: listHotelsComponent },
     { path:'hotels/:id/edit' , component: HotelEditerComponent,
       canDeactivate: [HotelEditGuard]},
     { path:'**' , redirectTo:'home', pathMatch:'full' },
    ]), 
    InMemoryWebApiModule.forFeature(HotelData) 
  ],

  providers: [ HotelListService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
