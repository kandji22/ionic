import { ServiceService } from './service.service';
import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  constructor(
    private service: ServiceService,
    private nav: NavController,
    private  load: LoadingController
  ) { }

  ngOnInit() {
  }

  onLogin(){
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
}
