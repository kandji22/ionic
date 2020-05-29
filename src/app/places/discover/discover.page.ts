import { PlacesService } from './../../service/places.service';
import { Place } from './../place.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit {
places: Place[];
  constructor(
    private service: PlacesService
  ) { }

  ngOnInit() {
this.places = this.service.getPlace();
  }

}
