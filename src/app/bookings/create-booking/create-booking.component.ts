import { Component, OnInit, Input } from '@angular/core';
import { Place } from 'src/app/places/place.model';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss'],
})
export class CreateBookingComponent implements OnInit {
@Input() placeTobook: Place
  constructor(
    private modal: ModalController
  ) { }

  ngOnInit() {}

  onClose() {
this.modal.dismiss('fermer modal','cancel')
  }

  onAdd() {
    this.modal.dismiss('ajouter book','confirm')
  }
}
