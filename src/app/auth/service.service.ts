import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  iduser="abcdef"
authentication = true;
  constructor( ) { }
login(){
this.authentication = true;
}

logout(){
  this.authentication = false;
  }
  getAuth(){
    return this.authentication;
  }
  getiduser(){
    return this.iduser;
  }
}
