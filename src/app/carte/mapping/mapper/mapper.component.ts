import { ModalController } from '@ionic/angular';
import { environment } from './../../../../environments/environment';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import * as Mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-mapper',
  templateUrl: './mapper.component.html',
  styleUrls: ['./mapper.component.scss'],
})
export class MapperComponent implements OnInit, AfterViewInit {
@ViewChild('map') mapElement: ElementRef
mapa : Mapboxgl.Map;
SelectorCood: {}
  constructor(
    private ModalCtrl: ModalController
  ) { }

  ngOnInit() {}
  ngAfterViewInit(){
this.CreateMap()
  }

  CreateMap(){
    
   const mapEl = this.mapElement.nativeElement;
   Object.getOwnPropertyDescriptor(Mapboxgl, "accessToken").set(environment.maxBoxKey);
   this.mapa = new Mapboxgl.Map({
   container: mapEl,
   style: 'mapbox://styles/mapbox/streets-v11',
   center: [-74.5, 40], // starting position
   zoom: 9 // starting zoom
   });
   this.CreateMarked(-74.5, 40)
  }
  CreateMarked(lat: number, lng: number) {
   let marker = new Mapboxgl.Marker({
      draggable: true
      })
      .setLngLat([lat, lng])
      .addTo(this.mapa);
   marker.on('dragend', () => {
        this.SelectorCood=    {
          lat: marker.getLngLat().lat,
          lng:  marker.getLngLat().lng
          }   
      });
  }
  OnCancel(){
    this.ModalCtrl.dismiss()
  }
  Choice(){
    this.ModalCtrl.dismiss(this.SelectorCood)
  }
}

