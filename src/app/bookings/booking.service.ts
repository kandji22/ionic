import { ServiceService } from './../auth/service.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { take, tap, delay, switchMap,map } from 'rxjs/operators';

import { Booking } from './booking.model';


@Injectable({ providedIn: 'root' })
export class BookingService {
  private _bookings = new BehaviorSubject<Booking[]>([]);

  get bookings() {
    return this._bookings.asObservable();
  }

  constructor(private authService: ServiceService, private http: HttpClient) {}

  addBooking(
    placeId: string,
    placeTitle: string,
    placeImage: string,
    firstName: string,
    lastName: string,
    guestNumber: number,
    dateFrom: Date,
    dateTo: Date
  ) {
    let generatedId: string;
    const newBooking = new Booking(
      Math.random().toString(),
      placeId,
      this.authService.iduser,
      placeTitle,
      placeImage,
      firstName,
      lastName,
      guestNumber,
      dateFrom,
      dateTo
    );
    return this.http
      .post<{ name: string }>(
        'https://ionic-angular-ed8c9.firebaseio.com/bookings.json',
        { ...newBooking, id: null }
      )
      .pipe(
        switchMap(resData => {
          generatedId = resData.name;
          return this.bookings;
        }),
        take(1),
        tap(bookings => {
          newBooking.id = generatedId;
          this._bookings.next(bookings.concat(newBooking));
        })
      );
  }

  cancelBooking(bookingId: string) {
   return this.http.delete(`https://ionic-angular-ed8c9.firebaseio.com/bookings/${bookingId}.json`)
   .pipe( switchMap(()=>{
    return this.bookings
   }),take(1),
   tap(data=>{
     this._bookings.next(data.filter(b => b.id !== bookingId))
   })
   )
  }
  
  fetchingBooking(){
    return this.http
    .get<{ [key: string]: Booking }>(
      `https://ionic-angular-ed8c9.firebaseio.com/bookings.json?orderBy="userId"&equalTo="${this.authService.iduser}"`
    )
    .pipe(
      map(data => {
        const places = [];
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            places.push(
              new Booking(
                key,
                data[key].placeId,
                data[key].userId,
               data[key].placeTitle,
              data[key].placeImage,
              data[key].firstName,
              data[key].lastName,
              data[key].guestNumber,
              new Date(data[key].bookedFrom),
              new Date(data[key].bookedTo)
              )
            );
          }
        }
        return places;
        // return [];
      }),
      tap(data => {
        this._bookings.next(data);
      })
    );
}



}



