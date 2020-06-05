import { NgForm } from '@angular/forms';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Place } from 'src/app/places/place.model';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss'],
})
export class CreateBookingComponent implements OnInit {
@Input() placeTobook: Place
@Input() selectedMode: 'select'|'random'
startDate: string;
endDate: string;
@ViewChild('f',{static: true}) form: NgForm;


  constructor(
    private modal: ModalController,
  
  ) { }


  ngOnInit() {
    const availableFrom = new Date(this.placeTobook.availableFrom)
    const availableTo = new Date(this.placeTobook.availableTo)
    if (this.selectedMode ==='random'){
      this.startDate=
      new Date(
        availableFrom.getTime() +
          Math.random() *
            (availableTo.getTime() -
              7 * 24 * 60 * 60 * 1000 -
              availableFrom.getTime())
      ).toISOString();

      this.endDate=
      new Date(
        new Date(this.startDate).getTime() +
          Math.random() *
            (new Date(this.startDate).getTime() +
              6 * 24 * 60 * 60 * 1000 -
              new Date(this.startDate).getTime())
      ).toISOString();
    }

    } 


  onCancel() {
this.modal.dismiss('fermer modal','cancel')
  }
dateexate(){
const dateof = this.form.value['date-from']
const dateend = this.form.value['date-to']
return dateend > dateof
}

  onBookPlace() {
    if(!this.form.valid || !this.dateexate()){
    return
    }
   
    this.modal.dismiss({donneform: {
      first: this.form.value['first-name'],
      last:  this.form.value['last-name'],
      guest: this.form.value['guest-number'],
      datefrom: this.form.value['date-from'],
      dateto: this.form.value['date-to']
    }},'confirm')
  
  }

}
