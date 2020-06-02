
import { ServiceService } from './../auth/service.service';
import { Place } from './../places/place.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {take, map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private places= new BehaviorSubject<Place[]>([
    new Place(
      'p1',
      'Manhattan Mansion',
      'In the heart of New York City.',
      'https://lonelyplanetimages.imgix.net/mastheads/GettyImages-538096543_medium.jpg?sharp=10&vib=20&w=1200',
      149.99,
      new Date('2019-01-01'),
      new Date('2019-12-31'),
      'abc'
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

    )
  ])
 
  get getPlace() {
   return this.places.asObservable()
  }
  getOnlyPlace(id) {
    return this.getPlace.pipe(
      take(1),
      map(places => {
        return { ...places.find(p => p.id === id) };
      })
    );
  }
  addPlace(
    title: string,
    description: string, 
    price: number, 
    availableFrom: Date,
    availableTo: Date,
      ){
       const newplace= new Place(Math.random().toString(),
       title,
       description,
       'https://lonelyplanetimages.imgix.net/mastheads/GettyImages-538096543_medium.jpg?sharp=10&vib=20&w=1200',
       price,
       availableFrom,
       availableTo,
      this.authService.getiduser()
       );
       this.getPlace.pipe(take(1)).subscribe(data=>{
         this.places.next(data.concat(newplace))
       })
  }

  constructor(
    private authService : ServiceService,

  ) { }
}
