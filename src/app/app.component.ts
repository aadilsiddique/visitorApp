import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { SharedService } from './services/shared.service';
import { UtilService } from './services/util.service';

import { Storage } from '@ionic/storage-angular';
import { BroadCasteService } from './services/broadcaste.service';
import { Network } from '@ionic-native/network/ngx';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  username = "";
  designation = "";

 
  constructor(
    public storage: Storage,
    public platform: Platform,
    public sharedServices: SharedService,
    public router: Router,
    public utilService : UtilService,
    public navCtrl : NavController,
    public toastController: ToastController,
    public broadcaster: BroadCasteService,
    private network: Network,
  ) {
  
  }
   
 
  async ngOnInit() {
    this.initializeApp();
    await this.storage.create();
  }
  initializeApp() {
    console.log("AppComponent")
    this.checkInternetConnection();
    this.platform.ready().then(() => {
      var lastTimeBackPress = 0;
      var timePeriodToExit = 2000;

      this.platform.backButton.subscribeWithPriority(10, () => {
          console.log("back")
          if (this.router.url == "/home") {
            if (new Date().getTime() - lastTimeBackPress < timePeriodToExit) {
              navigator['app'].exitApp();
            } else {
              this.presentToast();
              lastTimeBackPress = new Date().getTime();
            }
          }
          if (this.router.url == "/visitor-list") {
            this.utilService.navigateTo("home", this.navCtrl);
            this.navigateTo("home")
          }
          if (this.router.url == "/visitor-add-edit") {
            this.navigateTo("visitor-list")
          }
          if (this.router.url == "/lattest-news") {
            this.navigateTo("home")
          }
           else {
          }
      });
    });
  }

  navigateTo(location: any) {
    console.log("navigateTo")
    this.utilService.navigateTo(location, this.navCtrl);
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Press back again to exit App',
      duration: 2000
    });
    toast.present();
  }
  checkInternetConnection(){
      this.network.onDisconnect().subscribe(async () => {
      this.offlineToast(false);
      });
     this.network.onConnect().subscribe(() => {
        this.offlineToast(true);
      });
  }
  async offlineToast(flag) {
    if(flag){
      const toast = await this.toastController.create({
        message: 'network connected!',
        duration: 2000
      });
      toast.present();
    }
    else{
      const toast = await this.toastController.create({
        message: 'network was disconnected :-(',
        duration: 2000
      });
      toast.present();
    }
  }

}
