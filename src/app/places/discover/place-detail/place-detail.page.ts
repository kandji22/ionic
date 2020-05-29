import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, ModalController } from '@ionic/angular';
import { PlacesService } from 'src/app/service/places.service';
import { Place } from '../../place.model';
import { CreateBookingComponent } from 'src/app/bookings/create-booking/create-booking.component';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit {
  place: Place;
  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private placesService: PlacesService,
    private modal: ModalController
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('placeId')) {
        this.navCtrl.navigateBack('/places/tabs/discover');
        return;
      }
      this.place = this.placesService.getOnlyPlace(paramMap.get('placeId'));
    });
  }
  OnBookPlace(){
this.modal.create({component: CreateBookingComponent,componentProps: {placeTobook: this.place}}).then(m=>{
  m.present();
  return m.onDidDismiss()
}).then(result=>{
  console.log(result.data)
  console.log(result.role)
  if(result.role==="confirm"){
    console.log("booked")
  }
});
  }
}
