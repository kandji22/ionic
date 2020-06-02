import { PlacesService } from './../../service/places.service';
import { Place } from './../place.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { SegmentChangeEventDetail } from '@ionic/core';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit,OnDestroy{
  private subscribeplaces: Subscription
places: Place[];
  constructor(
    private service: PlacesService
  ) { }

  ngOnInit() {
this.subscribeplaces = this.service.getPlace.subscribe(data =>{
  this.places=data
});
  }
  onFilterUpdate(tenement: CustomEvent<SegmentChangeEventDetail>){
console.log(tenement.detail)
}
ngOnDestroy(){
  if (this.subscribeplaces) {
    this.subscribeplaces.unsubscribe()
  }
}
}
