import { Location } from './../../../carte/picker/location.model';
import { Router } from '@angular/router';
import { PlacesService } from 'src/app/service/places.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-new-offer',
  templateUrl: './new-offer.page.html',
  styleUrls: ['./new-offer.page.scss'],
})
export class NewOfferPage implements OnInit {
  coordonn: Location
  propertiesForm: FormGroup;
  constructor(
    private formbuilder: FormBuilder,
    private service: PlacesService,
    private route: Router,
    private loadingCtrl: LoadingController
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
        dateTo :['',Validators.required],
        location: ['', Validators.required]
     })
  }
  onCreateOffer(){
    if(!this.propertiesForm.valid)
    {
      return;
    }
    this.loadingCtrl.create({keyboardClose: true,
      message:"created offer"
    }).then((l)=>{
      l.present()
      this.service.addPlace(
        this.propertiesForm.value.title,
        this.propertiesForm.value.description,
        +this.propertiesForm.value.price, 
        new Date(this.propertiesForm.value.dateFrom),
        new Date(this.propertiesForm.value.dateTo),
        this.propertiesForm.value.Location
        ).subscribe(()=>{
          l.dismiss()
          this.propertiesForm.reset()
          this.route.navigateByUrl('/places/tabs/offers')
        })
    })

  }
  onCoordonneCreate($event)
  {
this.coordonn=$event
console.log(this.coordonn)
this.propertiesForm.patchValue({ location: this.coordonn });
  }

}
