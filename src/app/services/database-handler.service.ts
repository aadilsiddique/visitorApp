import { Injectable } from '@angular/core';
import { DatabaseService } from './database.service';
@Injectable({
  providedIn: 'root'
})
export class DatabaseHandlerService {

  constructor(
    private databaseService: DatabaseService,
  ) { }


  insertVisitor(dataArr: any, onSuccess: any, onError: any) {
    var ref = this;
    ref.databaseService.lastIndexOfTable("visitot_mst", "id", function (lastIndex: any) {
      dataArr.schoolId = lastIndex
      var valueArr = [];
      valueArr.push("'" + lastIndex + "'");
      valueArr.push("'" + dataArr["name"] + "'");
      valueArr.push("'" + dataArr["email"] + "'");
      valueArr.push("'" + dataArr["typeOfVisit"] + "'");
      valueArr.push("'" + dataArr["personVisit"] + "'");
      valueArr.push("'" + dataArr["entryDate"] + "'");
      valueArr.push("'" + dataArr["start_time"] + "'");
      valueArr.push("'" + dataArr["end_time"] + "'");
      valueArr.push("'Y'");
      ref.databaseService.insertData("visitot_mst", valueArr, function (successResult: any) {
        onSuccess();
      }, function () { });
    }, function () { });
  }
  
  updateVisitor(visitorObj: any, onSuccess: any) {
    var ref = this;
    var columnData = [];
    columnData.push("id");
      columnData.push("name");
      columnData.push("email");
      columnData.push("typeOfVisit");
      columnData.push("personVisit");
      columnData.push("entryDate");
      columnData.push("start_time");
      columnData.push("end_time");
      columnData.push("actFlag");

    var valueArr = [];
    valueArr.push(visitorObj["id"]);
    valueArr.push(visitorObj["name"]);
    valueArr.push(visitorObj["email"]);
    valueArr.push(visitorObj["typeOfVisit"]);
    valueArr.push(visitorObj["personVisit"]);
    valueArr.push(visitorObj["entryDate"]);
    valueArr.push(visitorObj["start_time"]);
    valueArr.push(visitorObj["end_time"]);
    valueArr.push("Y");
    ref.databaseService.updateDbParticularRowMultipleData("visitot_mst", columnData, valueArr, "id", visitorObj["id"], function (successResult: any) {
      onSuccess()
    }, function () { });
  }
}