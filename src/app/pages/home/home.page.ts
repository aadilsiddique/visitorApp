import { Component } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { DatabaseTablesService } from 'src/app/services/database-tables.service';
import { DatabaseService } from 'src/app/services/database.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private utilservices: UtilService,
    private navCtrl: NavController,
    private databaseServices : DatabaseService,
    private databaseTableServices : DatabaseTablesService,
    private platform: Platform,
  ) { 
    // var date = this.utilservices.getCurrentDate()
  }
  ngOnInit() {
    this.callDatabase();
  }
  callDatabase(){
    var ref = this;
    console.log("HomePage")
    this.platform.ready().then(() => {
    ref.databaseServices.openDatabase(function () {
      ref.databaseTableServices.createDatabase(function () {
        console.log("Database Created");
      }, function () {
        console.log("Error Creating Database");
      });
    });
  });
  }
  ionViewDidEnter() {
  }

 

  showVisitor() {
    var ref = this;
    ref.utilservices.navigateTo("visitor-list", ref.navCtrl);
  }
  showNews() {
    var ref = this;
    ref.utilservices.navigateTo("lattest-news", ref.navCtrl);
  }
}
