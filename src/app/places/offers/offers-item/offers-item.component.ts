import { Component, OnInit, Input } from '@angular/core';
import { Place } from '../../place.model';

@Component({
  selector: 'app-offers-item',
  templateUrl: './offers-item.component.html',
  styleUrls: ['./offers-item.component.scss'],
})
export class OffersItemComponent implements OnInit {
@Input() places: Place
  constructor() { }

  ngOnInit() {}
  getDummyDate(){
    return new Date()
  }
}
