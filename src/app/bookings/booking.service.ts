
import { ServiceService } from './../auth/service.service';
import { Booking } from './booking.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {take, map, delay, tap} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class BookingService {
private bookings = new BehaviorSubject<Booking[]>([]);
constructor(
  private authservice: ServiceService
) { }
get getbookings(){
return this.bookings.asObservable()
}
addBooking(
 placeId: string,
 placeTitle: string,
 placeImage: string,
 firstName: string,
 lastName: string,
 guestNumber: number,
 bookedFrom: Date,
 bookedTo: Date
){
const newBooking = new Booking
(
Math.random().toString(),
placeId,
this.authservice.getiduser(),
placeTitle,
placeImage,
firstName,
lastName,
guestNumber,
bookedFrom,
bookedTo
)
return this.getbookings.pipe
 (take(1),delay(2000),
 tap(data => {
  this.bookings.next(data.concat(newBooking))
}))
}
 cancel(id){
   return this.getbookings.pipe(take(1),delay(2000),tap(data=>{
     return this.bookings.next(data.filter(e=>{
       return e.id !== id
     }))
   }))
 }

}
