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
    private formbuilder: FormBuilder
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
console.log(this.propertiesForm)
  }
}
