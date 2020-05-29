import { PlacesService } from './../../service/places.service';
import { Component, OnInit } from '@angular/core';
import { Place } from '../place.model';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {
places: Place[]
  constructor(
   private service: PlacesService
  ) { }

  ngOnInit() {
    this.places=this.service.getPlace()
  }

}
