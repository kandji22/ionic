import { PlacesService } from './../../../service/places.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Place } from '../../place.model';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit,OnDestroy {
place: Place;
private subsplace: Subscription
propertiesForm: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private service: PlacesService,
    private navCtrl: NavController,
    private formCtrl: FormBuilder
  ) {}

  ngOnInit() { 
    this.route.paramMap.subscribe(paramMap => {
    if (!paramMap.has('placeId')) {
      this.navCtrl.navigateBack('/places/tabs/offers');
      return;
    }
    this.subsplace = this.service.getOnlyPlace(paramMap.get('placeId')).subscribe(data =>{
this.place=data
    })

    this.propertiesForm= this.formCtrl.group({
      title: [this.place.title,Validators.required],
      description: [this.place.description,[Validators.required,Validators.maxLength(180)]]    
    })
  });
}
onUpdateOffer(){
  if(!this.propertiesForm.valid) {
    return
  }
  console.log(this.propertiesForm)
}
ngOnDestroy() {
  this.subsplace.unsubscribe()
}
}