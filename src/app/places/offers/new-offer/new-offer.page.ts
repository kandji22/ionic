import { Router } from '@angular/router';
import { PlacesService } from 'src/app/service/places.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-offer',
  templateUrl: './new-offer.page.html',
  styleUrls: ['./new-offer.page.scss'],
})
export class NewOfferPage implements OnInit {
  propertiesForm: FormGroup;
  constructor(
    private formbuilder: FormBuilder,
    private service: PlacesService,
    private route: Router
  ) { }

  ngOnInit() {
   this.initFormBuilder()
  }
  initFormBuilder(){
    this.propertiesForm=this.formbuilder.group({
      title: ['',Validators.required],
       description: ['',[Validators.required,Validators.maxLength(180)]],
        price: ['',[Validators.required,Validators.min(1)]],
        dateFrom: ['',Validators.required],
        dateTo :['',Validators.required]
     })
  }
  onCreateOffer(){
    if(!this.propertiesForm.valid)
    {
      return;
    }
    this.service.addPlace(
  this.propertiesForm.value.title,
  this.propertiesForm.value.description,
  +this.propertiesForm.value.price,
  new Date(this.propertiesForm.value.dateFrom),
  new Date(this.propertiesForm.value.dateTo)
  )
   
    this.propertiesForm.reset()
    this.route.navigateByUrl('/places/tabs/offers')
  }

}
