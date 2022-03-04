import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DatabaseService } from 'src/app/services/database.service';
import { NativeService } from 'src/app/services/native.service';
import { SharedService } from 'src/app/services/shared.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-visitor-list',
  templateUrl: './visitor-list.page.html',
  styleUrls: ['./visitor-list.page.scss'],
})
export class VisitorListPage implements OnInit {
  visitorListArr=[]
  visitTypeArr=[
    {
      "visitId": 1,
      "visitDesc": "Meeting",
    },
    {
      "visitId": 2,
      "visitDesc": "Delivery",
    }, 
    {
      "visitId": 3,
      "visitDesc": "Personal",
    },
  ];
  dataAvailbleOrNotCheck = false
  constructor(
    private utilservices: UtilService,
    private sharedServices: SharedService,
    private navCtrl: NavController,
    private databaseServices : DatabaseService,
    private nativeService : NativeService
  ) { }

  ngOnInit() {
  // 
  }

  ionViewDidEnter() {
   console.log("VisitorListPage")
    this.getVisitor()
  }
  getVisitor(){
    var ref  = this;
    this.visitorListArr=[]
    var tempArr=[]
    this.nativeService.callSpinnerDialogService("show", "Loading Data Please Wait");
      ref.databaseServices.selectAllDataFromTable("visitot_mst", function (successResult: any) {
        if (successResult.rows.length > 0) {
          for (var i = 0; i < successResult.rows.length; i++) {
            var visitorListObj = successResult.rows.item(i);
            var tempArr=[]
            tempArr = ref.visitTypeArr.filter((item) => {
              return (item["visitId"] == visitorListObj.typeOfVisit);
            })
            visitorListObj.typeOfVisitDesc = tempArr[0].visitDesc
            ref.visitorListArr.push(visitorListObj);
          }
          ref.nativeService.callSpinnerDialogService("hide", "Loading Data Please Wait");
        }
        else{
          ref.nativeService.callSpinnerDialogService("hide", "Loading Data Please Wait");
          ref.dataAvailbleOrNotCheck = true;
        }
      
      }, function () { });
  }
  addVisitor(){
    var ref = this;
    ref.sharedServices.setOperationType("add")
    ref.utilservices.navigateTo("visitor-add-edit", ref.navCtrl);
  }
  editVisitor(item) {
    var ref = this;
    ref.sharedServices.setOperationType("edit")
    ref.sharedServices.setSelectedObj(item)
    ref.utilservices.navigateTo("visitor-add-edit", ref.navCtrl);
  }

  deleteVisit(item){
    event.stopPropagation();
    var ref = this;
    ref.databaseServices.deleteRowDataFromTable("visitot_mst", ["id"],
    [item.id], function (successResult: any) {
      ref.nativeService.callToastService("Visitor Deleted", "long");
      ref.getVisitor();
    }, function () { });
  }

}
