import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DatabaseHandlerService } from 'src/app/services/database-handler.service';
import { NativeService } from 'src/app/services/native.service';
import { SharedService } from 'src/app/services/shared.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-visitor-add-edit',
  templateUrl: './visitor-add-edit.page.html',
  styleUrls: ['./visitor-add-edit.page.scss'],
})
export class VisitorAddEditPage implements OnInit {
  readonlyData =true;
  valid = true;
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
  visitorObj = {
    name: '',
    email: '',
    typeOfVisit: '',
    personVisit: '',
    entryDate: '',
    start_time: '',
    start_timeObj: new Date(),
    end_time: '',
    end_timeObj: new Date(),
   
  };
  constructor(   
    private utilservices: UtilService,
    private sharedServices: SharedService,
    private navCtrl: NavController,
    private nativeServices : NativeService,
    private databaseHandlerServices : DatabaseHandlerService
    ) { }

  ngOnInit() {
    
  }
  ionViewDidEnter() {
    console.log("VisitorAddEditPage")
    var ref = this
    if (ref.sharedServices.getOperationType() == "edit") {
      ref.visitorObj = ref.sharedServices.getSelectedObj()
        ref.visitorObj.start_timeObj = new Date()
        ref.visitorObj.end_timeObj = new Date()
    }
    else{
      this.visitorObj.entryDate = this.utilservices.getCurrentDate()
    }
  }

  openStartTimePicker() {
    var ref = this;
    ref.nativeServices.callTimepickerService(ref.visitorObj.start_timeObj, function (timeObj: any) {
        var time = new Date().getTime();
        if (timeObj.getTime() < time) {
          ref.nativeServices.callToastService("Select start time", "short");
          return false;
        }
      ref.visitorObj.start_timeObj = timeObj;
      ref.visitorObj.start_time = ref.utilservices.getCurrentTimeFromTimeObj(timeObj);
  
    }, function () { });
  }

  openEndTimePicker() {
    var ref = this;
    ref.nativeServices.callTimepickerService(ref.visitorObj.end_timeObj, function (timeObj: any) {
      if (ref.visitorObj.start_time != "") {
        var tempDateObj = ref.visitorObj.end_timeObj;
        if (timeObj.getTime() < tempDateObj.getTime()) {
          ref.nativeServices.callToastService("End Time should be more than Start Time", "short");
          return false;
        }
      }
      ref.visitorObj.end_timeObj = timeObj;
      ref.visitorObj.end_time = ref.utilservices.getCurrentTimeFromTimeObj(timeObj);
     
    }, function () { });
  }

  submit(addEditVisitor) {
    this.valid = addEditVisitor.valid;
    var ref = this;
    console.log(ref.visitorObj)
    if (this.valid) {
      ref.nativeServices.callSpinnerDialogService("show", "Submitting Visit");
      if (ref.sharedServices.getOperationType() == "edit") {
        this.databaseHandlerServices.updateVisitor(this.visitorObj, function (successResult: any) {
          console.log(successResult)
          ref.nativeServices.callToastService("Visitor Updated", "long");
          ref.utilservices.navigateBack(ref.navCtrl);
          ref.nativeServices.callSpinnerDialogService("hide", "Submitting Visit");
        });
      }
      else{
        this.databaseHandlerServices.insertVisitor(this.visitorObj, function (successResult: any) {
        ref.nativeServices.callToastService("Visitor Added", "long");
        ref.utilservices.navigateBack(ref.navCtrl);
        ref.nativeServices.callSpinnerDialogService("hide", "Submitting Visit");
        },
          function (errorResponse: any) {
            ref.nativeServices.callSpinnerDialogService("hide", "Submitting Data Please Wait");
          });
      }
      
      ref.nativeServices.callSpinnerDialogService("hide", "Submitting Visit");
    }

  }
}
