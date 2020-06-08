import { async } from '@angular/core/testing';
import { ServiceService } from './../../../auth/service.service';
import { BookingService } from './../../../bookings/booking.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, ModalController, ActionSheetController, LoadingController, AlertController } from '@ionic/angular';
import { PlacesService } from 'src/app/service/places.service';
import { Place } from '../../place.model';
import { CreateBookingComponent } from 'src/app/bookings/create-booking/create-booking.component';
import { Subscription } from 'rxjs';
import { getLocaleNumberFormat } from '@angular/common';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit,OnDestroy{
  bookable = true
  subsplaces: Subscription
  bookingSubscrib: Subscription
  place: Place;
  loading= false
  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private placesService: PlacesService,
    private modal: ModalController,
    private action: ActionSheetController,
    private bookService: BookingService,
    private Load: LoadingController ,
    private authService: ServiceService,
    private router: Router,
    private alerCtrl: AlertController
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('placeId')) {
        this.navCtrl.navigateBack('/places/tabs/discover');
        return;
      }
      this.loading = true;
      this.subsplaces = this.placesService.getOnlyPlace(paramMap.get('placeId'))
        .subscribe(
          place => {
            this.place = place;
            this.bookable = place.userId !== this.authService.iduser;
            this.loading = false;
          },
          error => {
            this.alerCtrl
              .create({
                header: 'An error ocurred!',
                message: 'Could not load place.',
                buttons: [
                  {
                    text: 'Okay',
                    handler: () => {
                      this.router.navigate(['/places/tabs/discover']);
                    }
                  }
                ]
              })
              .then(alertEl => alertEl.present());
          }
        );
    });
  }

  

  OnBookPlace(){
this.action.create
({
  header:'Choose an Action',
  buttons: [
    {
      text: 'Cancel',
      role: 'cancel'
    },
    {
      text: 'Random Date',
      handler: () => {
        this.OnBookModal('random')
      }
    },
      {
        text: 'Selected Date',
        handler: () => {
         this.OnBookModal('select')
        }
    }
  ]
}).then(p=> p.present())
  }

  OnBookModal(mode: 'select'|'random'){
    console.log(mode)
    this.modal.create({component: CreateBookingComponent,
      componentProps: {
      placeTobook: this.place,
      selectedMode: mode
      }}).then(m=>{
      m.present();
      return m.onDidDismiss()
    }).then(result=>{
      console.log(result.data)
      
      if(result.role==="confirm"){
        console.log("booked")
        this.Load.create({message:"Loading.."}).then(l=>{
          l.present()
          this.bookingSubscrib= this.bookService.addBooking(
            this.place.id,
            this.place.title,
            this.place.imageUrl,
            result.data.donneform.first,
            result.data.donneform.last,
            result.data.donneform.guest,
            result.data.donneform.datefrom,
            result.data.donneform.dateto
          ).subscribe(()=>{
            l.dismiss()
          })
        })
      }
    });
  }

  ngOnDestroy(){
    if (this.subsplaces){
      this.subsplaces.unsubscribe()
    }
    if (this.bookingSubscrib){
    this.bookingSubscrib.unsubscribe()
    }
  }
}
