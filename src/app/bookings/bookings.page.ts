import { Subscription } from 'rxjs';
import { BookingService } from './booking.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Booking } from './booking.model';
import { IonItemSliding, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit,OnDestroy {
loadedBooking: Booking[]
bookingSub: Subscription
booksupSub: Subscription
  constructor(
    private bookingService: BookingService,
    private loadCtrl: LoadingController,
  ) { }

  ngOnInit() {
    this.bookingSub= this.bookingService.getbookings.subscribe((data)=>{
      this.loadedBooking=data
    })
  }
ngOnDestroy(){
  this.bookingSub.unsubscribe()
}
onCancelBooking(offerId: string, slidingEl: IonItemSliding) {
  this.loadCtrl.create({message: 'Loading..'
  }).then(l=>{
    l.present()
    this.booksupSub=this.bookingService.cancel(offerId).subscribe(()=>{
      l.dismiss()
      slidingEl.close();
    })
  })
}
}
