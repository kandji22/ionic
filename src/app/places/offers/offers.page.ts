import { Router } from '@angular/router';
import { PlacesService } from './../../service/places.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Place } from '../place.model';
import { IonItemSliding } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit,OnDestroy {
  private subsplaces: Subscription
places: Place[]
  constructor(
   private service: PlacesService,
   private route: Router
  ) { }

  ngOnInit() {
    this.subsplaces=this.service.getPlace.subscribe(data=>{
      this.places=data
    })
  }
  onEdit(id: string, slider: IonItemSliding){
    slider.close()
    this.route.navigateByUrl('/places/tabs/offers/');
      }
      ngOnDestroy(){
        if(this.subsplaces){
          this.subsplaces.unsubscribe()
        }
      }
}
