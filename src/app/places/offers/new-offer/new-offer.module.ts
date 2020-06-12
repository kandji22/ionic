import { CarteModule } from './../../../carte/carte.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewOfferPageRoutingModule } from './new-offer-routing.module';

import { NewOfferPage } from './new-offer.page';
import { MapperComponent } from 'src/app/carte/mapping/mapper/mapper.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewOfferPageRoutingModule,
    ReactiveFormsModule,
    CarteModule
  ],
  declarations: [NewOfferPage],
  entryComponents: [MapperComponent]
})
export class NewOfferPageModule {}
