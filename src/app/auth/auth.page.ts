import { ServiceService } from './service.service';
import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  islog = false;
  constructor(
    private service: ServiceService,
    private nav: NavController,
    private  load: LoadingController
  ) { }

  ngOnInit() {
  }

  onLogin(form: NgForm){
    const email=form.value.email;
    const password= form.value.password
    console.log(email)
    console.log(password)
    if(this.islog){
      //envoi a sign in
    }
    else {
      //envoi a log in
    }
this.service.login()
this.load.create({keyboardClose:true,message:"loading.."}).then(l=>{
  l.present()
  setTimeout(
    ()=>{
      l.dismiss()
      this.nav.navigateBack('/places/tabs/discover')
    },1500
  )
});
  }
 
  isLogines() {
this.islog =!this.islog
  }
}
