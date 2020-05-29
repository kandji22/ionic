import { ServiceService } from './service.service';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  constructor(
    private service: ServiceService,
    private nav: NavController
  ) { }

  ngOnInit() {
  }

  onLogin(){
this.service.login()
this.nav.navigateBack('/places/tabs/discover')
  }
}
