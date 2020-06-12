import { Location } from './../carte/picker/location.model';

import { ServiceService } from './../auth/service.service';
import { Place } from './../places/place.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject, pipe,of } from 'rxjs';
import {take, map, delay, tap, switchMap} from 'rxjs/operators'
import { HttpClient } from '@angular/common/http';


interface PlaceData {
  availableFrom: string,
availableTo: string,
description: string,
imageUrl: string,
price: number,
title: string,
userId: string,
location: Location
}
@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private places= new BehaviorSubject<Place[]>([
   /* new Place(
      'p1',
      'Manhattan Mansion',
      'In the heart of New York City.',
      'https://lonelyplanetimages.imgix.net/mastheads/GettyImages-538096543_medium.jpg?sharp=10&vib=20&w=1200',
      149.99,
      new Date('2019-01-01'),
      new Date('2019-12-31'),
      'abcdef'
    ),
    new Place(
      'p2',
      "L'Amour Toujours",
      'A romantic place in Paris!',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Paris_Night.jpg/1024px-Paris_Night.jpg',
      189.99,
      new Date('2020-01-01'),
      new Date('2021-12-31'),
      'abc'
    ),
    new Place(
      'p3',
      'The Foggy Palace',
      'Not your average city trip!',
      'https://upload.wikimedia.org/wikipedia/commons/0/01/San_Francisco_with_two_bridges_and_the_fog.jpg',
      99.99,
      new Date('2021-01-01'),
      new Date('2022-12-31'),
      'abc'

    )*/
  ])
 
  get getPlace() {
   return this.places.asObservable()
  }
  getOnlyPlace(id) {
   return this.http.get<Place>(
     `https://ionic-angular-ed8c9.firebaseio.com/places/${id}.json`
     )
     .pipe(
     delay(1000),
     map(placeData=>{
       return new Place(
         id,
         placeData.title,
         placeData.description,
         placeData.imageUrl,
         placeData.price,
         new Date(placeData.availableFrom),
         new Date(placeData.availableTo),
         placeData.userId,
         placeData.location
       )
     })
   )
  }
  addPlace(
    title: string,
    description: string, 
    price: number, 
    availableFrom: Date,
    availableTo: Date,
    location: Location
      ){
        let generateId: string
        const newplace= new Place(Math.random().toString(),
       title,
       description,
       'https://lonelyplanetimages.imgix.net/mastheads/GettyImages-538096543_medium.jpg?sharp=10&vib=20&w=1200',
       price,
       availableFrom,
       availableTo,
      this.authService.getiduser(),
      location
       );
       //return this.getPlace.pipe
      // (take(1),delay(2000),
       //tap(data => {     
        //  this.places.next(data.concat(newplace))  
       //})
       // )
        return this.http.post<{name: string}>('https://ionic-angular-ed8c9.firebaseio.com/places.json',{...newplace,
       id: null})
       .pipe(
       switchMap(result=>{
         generateId =result.name
         console.log(result)
         return this.getPlace
       }),
       take(1),
       tap(data=>{
         newplace.id=generateId
         this.places.next(data.concat(newplace))
       }))

  }

  constructor(
    private authService : ServiceService,
    private http: HttpClient

  ) { }
  updatePlace(placeId: string, title: string, description: string) {
    let updatedPlaces: Place[]
    return this.getPlace.pipe(
      take(1),
      switchMap(places => {
        if(!places || places.length<=0){
         return this.fetchPlaces()
        }
        else {
          return of(places)
        }
      }),
      switchMap(places=>{
        const updatedPlaceIndex = places.findIndex(pl => pl.id === placeId);
        updatedPlaces = [...places];
        const oldPlace = updatedPlaces[updatedPlaceIndex];
        updatedPlaces[updatedPlaceIndex] = new Place(
          oldPlace.id,
          title,
          description,
          oldPlace.imageUrl,
          oldPlace.price,
          oldPlace.availableFrom,
          oldPlace.availableTo,
          oldPlace.userId,
          oldPlace.location
        );
        return this.http.put(`https://ionic-angular-ed8c9.firebaseio.com/places/${placeId}.json`,{
        ...updatedPlaces[updatedPlaceIndex], id: null
      })
    }),
      tap(()=>{
        this.places.next(updatedPlaces)
     
      })
    );
  }


  fetchPlaces() {
    return this.http
      .get<{ [key: string]: PlaceData }>(
        'https://ionic-angular-ed8c9.firebaseio.com/places.json'
      )
      .pipe(
        map(resData => {
          const places = [];
          for (const key in resData) {
            if (resData.hasOwnProperty(key)) {
              places.push(
                new Place(
                  key,
                  resData[key].title,
                  resData[key].description,
                  resData[key].imageUrl,
                  resData[key].price,
                  new Date(resData[key].availableFrom),
                  new Date(resData[key].availableTo),
                  resData[key].userId,
                  resData[key].location
                )
              );
            }
          }
          return places;
          // return [];
        }),
        tap(places => {
          this.places.next(places);
        })
      );
  }
 
}






