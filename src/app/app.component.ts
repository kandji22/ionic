import { ServiceService } from './auth/service.service';
import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import {Plugins,Capacitor} from '@capacitor/core'

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private service: ServiceService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      if(Capacitor.isPluginAvailable('SplashScreen')){
        Plugins.SplashScreen.hide()
      }
    });
  }
  onLogout() {
    this.service.logout();
  }
}
