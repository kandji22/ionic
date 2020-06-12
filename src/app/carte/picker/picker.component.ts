
import { Location } from './location.model';
import { ModalController, ActionSheetController, AlertController } from '@ionic/angular';
import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { MapperComponent } from '../mapping/mapper/mapper.component';
import * as Mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';
import { Capacitor,Plugins } from '@capacitor/core';

@Component({
  selector: 'app-picker',
  templateUrl: './picker.component.html',
  styleUrls: ['./picker.component.scss'],
})
export class PickerComponent implements OnInit {
  @ViewChild('map') mapElement: ElementRef
  @Output() eventcoordonne = new EventEmitter<Location>()
  coordonne: Location
  mapa : Mapboxgl.Map;
  contry: string
  constructor(
    private modalCtrl: ModalController,
    private ActionshCtrl: ActionSheetController,
    private AlertCtrl : AlertController
  ) { }

  ngOnInit() {}

  openModalCarte() {
this.ActionshCtrl.create({
  header: 'please chose',
  buttons: [
    {
      text: "Auto Locate",
      handler: () => {
        this.picknatel()
      }
    },
    {
      text: "Pick Map",
      handler: () => {
        this.pickCarte()
      }
    },
    {
      text: "Cancel",
      role: "Cancel"
    }
  ]
}).then(s => {
  s.present()
})

  }
picknatel(){
if (!Capacitor.isPluginAvailable('Geolocation')){
  this.alertMap()
 return
}
Plugins.Geolocation.getCurrentPosition().then(geoposition=>{
const coordinate: Location= {
lg:geoposition.coords.latitude,
lng: geoposition.coords.longitude
}
this.createPlace(coordinate)

}).catch(()=>{
  this.alertMap()
})
}

alertMap(){
this.AlertCtrl.create({
  header: "Could not fetch a location",
  message: "Please use a map Location",
  buttons: ['okay']
}).then(l=>{
  l.present()
})
}

pickCarte(){
  this.modalCtrl.create({component: MapperComponent}).then(modal => {
  
    modal.onDidDismiss().then(done => {
      if (done.data){
        this.coordonne = {
          lg: done.data.lat,
          lng: done.data.lng
        }
     this.createPlace(this.coordonne)
      
    }}
    )
    
    modal.present()
  })
}

createPlace(localise: Location) {
  const mapEl = this.mapElement.nativeElement;
  Object.getOwnPropertyDescriptor(Mapboxgl, "accessToken").set(environment.maxBoxKey);
  this.mapa = new Mapboxgl.Map({
    container: mapEl,
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [localise.lg,localise.lng], // starting position
    zoom: 1 // starting zoom
    });
    this.eventcoordonne.emit(this.coordonne)
    
  this.CreateMarked(localise.lg, localise.lng)
}



  CreateMarked(lat: number, lng: number) {
     let marker = new Mapboxgl.Marker({
       draggable: false
       })
       .setLngLat([lat, lng])
       .addTo(this.mapa);
   }

}


