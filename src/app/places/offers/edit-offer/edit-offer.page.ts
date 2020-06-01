import { PlacesService } from './../../../service/places.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Component, OnInit } from '@angular/core';
import { Place } from '../../place.model';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit {
place: Place;
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
    this.place = this.service.getOnlyPlace(paramMap.get('placeId'));
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

}
