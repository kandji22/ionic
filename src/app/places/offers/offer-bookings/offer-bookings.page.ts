import { PlacesService } from './../../../service/places.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Place } from '../../place.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-offer-bookings',
  templateUrl: './offer-bookings.page.html',
  styleUrls: ['./offer-bookings.page.scss'],
})
export class OfferBookingsPage implements OnInit,OnDestroy {
  subsplace: Subscription
place: Place
  constructor(
private route: ActivatedRoute,
private service: PlacesService,
private nav: NavController
  ) { }

  ngOnInit() {
this.route.paramMap.subscribe(param => {
  if (!param.has('placeId')){
this.nav.navigateBack('/places/tabs/offers')
  }
  this.subsplace=this.service.getOnlyPlace(param.get('placeId')).subscribe(data =>{
    this.place=data
  })
})
  }
ngOnDestroy(){
  if (this.subsplace){
    this.subsplace.unsubscribe()
  }
}
}
