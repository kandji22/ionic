import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
authentication = false;
  constructor() { }
login(){
this.authentication = true;
}

logout(){
  this.authentication = false;
  }
  getAuth(){
    return this.authentication;
  }
}
