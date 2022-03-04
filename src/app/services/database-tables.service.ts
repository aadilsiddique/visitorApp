import { Injectable } from '@angular/core';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class DatabaseTablesService {
  constructor(private databaseService: DatabaseService) { }
  createDatabase(onSuccess: any, onError: any) {
    var ref = this;
    //Login Tables
    ref.createVisitorMst(function () {
        onSuccess();
     
    }, function (error: any) {
      console.log(error);
      onError();
    });
  }

  createVisitorMst(onSuccess: any, onError: any) {
    try {
      var columnData = [];
      columnData.push("id text");
      columnData.push("name text");
      columnData.push("email text");
      columnData.push("typeOfVisit text");
      columnData.push("personVisit text");
      columnData.push("entryDate text");
      columnData.push("start_time text");
      columnData.push("end_time text");
      columnData.push("actFlag text");
      this.databaseService.createDbTable("visitot_mst", columnData, function (success) {
        console.log("Table created visitot_mst")
        onSuccess();
      }, function (error) {
        onError("Unable to create the 'visitot_mst' table " + error.message);
      });
    } catch (e) {
      onError('Error in catch for visitot_mst: ' + e.message);
    }
  }
}