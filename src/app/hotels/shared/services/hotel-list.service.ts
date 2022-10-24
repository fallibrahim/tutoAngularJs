import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, of, throwError } from "rxjs";
import {catchError, tap } from "rxjs";
import { Ihotel } from "../models/hotel";

@Injectable({
    providedIn : 'root'
})

export class HotelListService {

    private readonly HOTEL_API_URL  = "api/hotels";
   
    constructor(private http : HttpClient){
        
    }
  
    public getHotels () : Observable<Ihotel[]>  {
     return this.http.get<Ihotel[]>(this.HOTEL_API_URL).pipe(
        tap(hotels => console.log('hotels: ', hotels)),
        catchError(this.handleError)
     );
  }
  
  public getHotelById(id: number) : Observable<Ihotel | null | undefined> {
    const url = `${this.HOTEL_API_URL}/${id}`;
    if (id === 0) {
      return of(this.getDefaultHotel());
    }  
    return this.http.get<Ihotel>(url).pipe(
     catchError(this.handleError)
    ); 
  }
  public createHotel(hotel:Ihotel) : Observable<Ihotel | null | undefined> {
    hotel = {
       ...hotel,
       imageUrl :"assets/img/savanaJardin.PNG",
       id : null!
    };
    return this.http.post<Ihotel>(this.HOTEL_API_URL, hotel).pipe(
      catchError(this.handleError)
    )
  } 
  public updateHotel(hotel:Ihotel) : Observable<Ihotel | null | undefined> {
    const url = `${this.HOTEL_API_URL}/${hotel.id}`;
    return this.http.put<Ihotel>(url, hotel).pipe(
      catchError(this.handleError)
    )
  }
 public deleteHotel(id: number) : Observable<{}> {
   const url  = `${this.HOTEL_API_URL}/${id}`;
   return this.http.delete<Ihotel>(url).pipe(
     catchError(this.handleError)
   )
 }
  
   private getDefaultHotel() : Ihotel {
    return {
      id: 0,
      nomHotels: null!,
      prix: null!,
      rating: null!,
      description: null!,
      imageUrl: null!
    }
   }
  private handleError(error: HttpErrorResponse) {
    let errorMessage!: string;
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
      errorMessage = `An error occurred:, ${error.error.message}`;
       
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${ error.status } `+
        `body was: ${ error.status }`);
        errorMessage = `Backend returned code ${ error.status }, ` +
        `body was: ${ error.status }`;
        
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.' +
    errorMessage));
  }
}