import { ServiceService } from './../../auth/service.service';
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
export class DiscoverPage implements OnInit, OnDestroy{
  isLoading = false
  private subscribeplaces: Subscription
places: Place[];
relevantPlaces: Place[]
  constructor(
    private service: PlacesService,
    private authService: ServiceService
  ) { }

  ngOnInit() {
this.subscribeplaces = this.service.getPlace.subscribe(data => {
  this.places = data
  this.relevantPlaces = this.places
});
  }
  ionViewWillEnter(){
    this.isLoading = true
    this.service.fetchPlaces().subscribe(() => {
     this.isLoading = false
   })
  }
  onFilterUpdate(event: CustomEvent<SegmentChangeEventDetail>){
if (event.detail.value == "bookable"){
this.relevantPlaces = this.relevantPlaces.filter((data) => {
return data.userId === this.authService.iduser
})

}
else{
this.relevantPlaces = this.places
}
}

ngOnDestroy(){
  if (this.subscribeplaces) {
    this.subscribeplaces.unsubscribe()
  }
}

}
