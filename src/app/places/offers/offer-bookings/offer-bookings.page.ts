import { PlacesService } from './../../../service/places.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Place } from '../../place.model';

@Component({
  selector: 'app-offer-bookings',
  templateUrl: './offer-bookings.page.html',
  styleUrls: ['./offer-bookings.page.scss'],
})
export class OfferBookingsPage implements OnInit {
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
  this.place=this.service.getOnlyPlace(param.get('placeId'));
})
  }

}
