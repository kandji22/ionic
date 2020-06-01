import { Router } from '@angular/router';
import { PlacesService } from './../../service/places.service';
import { Component, OnInit } from '@angular/core';
import { Place } from '../place.model';
import { IonItemSliding } from '@ionic/angular';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {
places: Place[]
  constructor(
   private service: PlacesService,
   private route: Router
  ) { }

  ngOnInit() {
    this.places=this.service.getPlace()
  }
  onEdit(id: string, slider: IonItemSliding){
    slider.close()
    this.route.navigateByUrl('/places/tabs/offers/');
      }
}
