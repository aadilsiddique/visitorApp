import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  platform: any;
  modalActive = false;
  modalObj: any;
  cookies = "";
  operationType:any;
  statusObj:any;
  selectedObj: any;
  constructor() { }

  
  public getPlatform(): any {
    return this.platform;
  }

  public setPlatform(platform: any) {
    this.platform = platform;
  }
  
  isModalActive() {
    return this.modalActive;
  }

  setModalActive(modalActive: any) {
    this.modalActive = modalActive;
  }

  public getModalObj(): any {
    return this.modalObj;
  }
  
  public setModalObj(modalObj: any) {
    this.modalObj = modalObj;
  }

  getCookies() {
    return this.cookies;
  }
  
  setCookies(cookies: any) {
    this.cookies = cookies;
  }

  public getOperationType(): any {
    return this.operationType;
  }

  public setOperationType(operationType: any) {
    this.operationType = operationType;
  }
  
  public getSelectedObj(): any {
    return this.selectedObj;
  }

  public setSelectedObj(selectedObj: any) {
    this.selectedObj = selectedObj;
  }

  public getSatusObj(): any {
    return this.statusObj;
  }

  public setStatusObj(statusObj: any) {
    this.statusObj = statusObj;
  }
  
}