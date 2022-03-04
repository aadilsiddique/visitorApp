import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConstantService {
  rootURL = '';
  rootURL_OLD = '';
  rootURLIdesk = '';
  projectConstants = {
    appEnv: '' /* Expected Values: DEV, UAT, PROD */,
    projectName_OLD: '',
    projectName: '',
    databaseName: 'visitor.db',
    reApiInvokeCount: 200,
    coveredDistance: 300 /*in cm*/,
    setCheckInTimeout: 13 /*in hours*/,
    maxduration: 9,
    dateSeparator: '-',
  };


  webservices = {

  };

  successMessage = {
    successMSG1: 'Your form has been submitted successfully',
    successMSG2: 'Customer saved successfully',
    successMSG3: 'Password saved successfully. Please login to continue',
    successMSG4: 'Visit saved successfully',
    successMSG5: 'All data synced successfully from server',
    successMSG6: 'All master data synced successfully from server',
    successMSG7: 'All data sent Successfully to server',
    successMSG8: 'Customer deleted successfully',
    successMSG9: 'Customer Contact saved successfully',
  };

  errorMessage = {
    errorMSG1: 'Unable to reach server. Please try again after sometime',
    errorMSG2:
      'Please turn on the data connectivty and restart the application',
    errorMSG3: 'Please clear your application data from settings and try again',
    errorMSG4:
      'Saving Data Offline. Please SYNC Data with Wifi/Data Connectivity TURN ON',
    errorMSG5: 'Authentication failed. Please enter valid credentials',
    errorMSG6: 'Unable to delete the data. Please sync and try again',
    errorMSG7 : "End Date cannot be less than Start Date",
  };

  // constructor() {
  //   if (this.projectConstants.appEnv == 'DEV') {
  //     this.rootURL_OLD =
  //       this.hostUrl.devURL + this.projectConstants.projectName_OLD + '/';
  //     this.rootURL =
  //       this.hostUrl.devURL + this.projectConstants.projectName + '/';
  //   } else if (this.projectConstants.appEnv == 'UAT') {
  //     this.rootURL_OLD =
  //       this.hostUrl.uatURL + this.projectConstants.projectName_OLD + '/';
  //     this.rootURL =
  //       this.hostUrl.uatURL + this.projectConstants.projectName + '/';
  //   } else if (this.projectConstants.appEnv == 'PROD') {
  //     this.rootURL_OLD =
  //       this.hostUrl.prodURL + this.projectConstants.projectName_OLD + '/';
  //     this.rootURL =
  //       this.hostUrl.prodURL + this.projectConstants.projectName + '/';
  //   }
  // }
}
