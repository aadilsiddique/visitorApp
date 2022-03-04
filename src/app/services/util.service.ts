import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { ConstantService } from './constant.service';
import { SharedService } from './shared.service';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { HttpInterceptor, HttpRequest, HttpHandler, HTTP_INTERCEPTORS } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  httpOptions = {
    // headers: new HttpHeaders({
    //   "Content-Type":  "application/json",
    //   "Accept":"application/json",
    // })
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/json; charset=utf-8',
      'X-Api-Key':'1848b5465b1449d78d10c2991b1bea98',
      'Accept': 'application/json;',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
     'Access-Control-Allow-Headers': 'Authorization, Lang, XMLHttpRequest',
    })
  };
  httpOptionsFile = {
    headers: new HttpHeaders({
      'Accept': 'application/json',
    })
  };

  navigationStack = [];
  _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  
 
  constructor(private shareServices: SharedService,
    private httpNative: HTTP,
    public http: HttpClient,
    private constantServices: ConstantService) { }

    callGetAPI(url: any, onSuccess: any, onError: any){
      console.log(url);
      // $("#loaderdiv").modal("show");
      this.http.get(url, this.httpOptions).subscribe(response => {
        window.setTimeout(function(){
          // $("#loaderdiv").modal("hide");
        }, 1000);
        console.log("Response: "+JSON.stringify(response));
        onSuccess(response);
      }, error => {
        window.setTimeout(function(){
          // $("#loaderdiv").modal("hide");
        }, 1000);
        console.log(error);
        onError(error);
      });
    }

  // callGetAPI1(url, onSuccess, onError) {
  //   console.log(url);
  //   var ref = this;
  //   // let headers = new HttpHeaders({'TRN-Api-Key': "1848b5465b1449d78d10c2991b1bea98"});
  //   if (this.shareServices.getCookies() != "") {
  //     this.httpNative.setCookie(url, this.shareServices.getCookies());
  //   }
  //   this.httpNative.setServerTrustMode("nocheck");
  //   this.httpNative.setRequestTimeout(180);
    
  //   // http.setHeader('*', 'Accept', '*/*');
  //   // this.httpNative.setHeader('*', 'Accept', '*/*')
  //   this.httpNative.get(url, {}, {})
  //     .then(data => {
  //       // if (data.headers["set-cookie"]) {
  //       //   ref.shareServices.setCookies(data.headers["set-cookie"]);
  //       // }
  //       console.log(data);
  //       console.log(JSON.parse(data.data));
  //       onSuccess(JSON.parse(data.data));
  //     })
  //     .catch(error => {
  //       console.log("error: this" + [error]);
  //       console.log("error: " + error.status);
  //       console.log("error: " + error.error); // error message as string
  //       console.log("error: " + error.headers);
  //       onError(error);
  //     });
  // }

 

 

  navigateTo(location: any, navCtrl: any) {
    if (this.navigationStack.indexOf(location) > -1) {
      var tempArr = [];
      for (var i = 0; i < this.navigationStack.length; i++) {
        if (this.navigationStack[i] == location) {
          break;
        }
        tempArr.push(this.navigationStack[i]);
      }
      this.navigationStack = new Array();
      this.navigationStack = tempArr;
    }
    this.navigationStack.push(location);
    navCtrl.navigateRoot([location]);
  }

  navigateBack(navCtrl: any) {
    this.navigationStack.pop();
    navCtrl.navigateRoot([this.navigationStack[this.navigationStack.length - 1]]);
  }

  trimming_fn(x) {
    return x ? x.replace(/^\s+|\s+$/gm, '') : '';
  }

  // var res = userInput.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
  validateUrl(email) {
    var re = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
    return re.test(String(email).toLowerCase());
  }
  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  validateMobile(mobile) {
    var re = /^[0-9]{10}$/;
    return re.test(String(mobile).toLowerCase());
  }

  validateOnlyCharacters(input) {
    var re = /^[a-zA-Z]{1,50}$/;
    return re.test(String(input).toLowerCase());
  }

  /*
  * encodeBase64: function
  * encodeBase64 is used to encode a string to base64 string.
  */


  _utf8_decode(utftext) {
    var string = "";
    var i = 0;
    var c =0, c3 = 0, c2 = 0;

    while (i < utftext.length) {
      c = utftext.charCodeAt(i);
      if (c < 128) {
        string += String.fromCharCode(c);
        i++;
      } else if ((c > 191) && (c < 224)) {
        c2 = utftext.charCodeAt(i + 1);
        string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
        i += 2;
      } else {
        c2 = utftext.charCodeAt(i + 1);
        c3 = utftext.charCodeAt(i + 2);
        string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
        i += 3;
      }
    }
    return string;
  }

  checkForUndefined(inputStr) {
    if (inputStr == undefined || inputStr == "undefined" || inputStr == null
      || inputStr == "null" || inputStr == "NULL" || inputStr == "NaN") {
      return "";
    } else {
      return inputStr;
    }
  }

  checkForUndefinedDash(inputStr) {
    if (inputStr == undefined || inputStr == "undefined" || inputStr == null
      || inputStr == "null" || inputStr == "NULL" || inputStr == "" || inputStr == "NaN") {
      return "-";
    } else {
      return inputStr;
    }
  }

  checkForUndefinedNA(inputStr) {
    if (inputStr == undefined || inputStr == "undefined" || inputStr == null
      || inputStr == "null" || inputStr == "NULL" || inputStr == "" || inputStr == "NaN") {
      return "NA";
    } else {
      return inputStr;
    }
  }

  getDifferenceBetweenLatLong(currentLat, currentLong, targetLat, targetLong) {
    var ref = this;
    var radiusOfEarth = 6371; // Radius of the earth in km
    var diffLat = ref.deg2rad(targetLat - currentLat);
    var diffLong = ref.deg2rad(targetLong - currentLong);
    var approxDiff =
      Math.sin(diffLat / 2) * Math.sin(diffLat / 2) +
      Math.cos(ref.deg2rad(currentLat)) * Math.cos(ref.deg2rad(targetLat)) *
      Math.sin(diffLong / 2) * Math.sin(diffLong / 2);
    var calculativeDiff = 2 * Math.atan2(Math.sqrt(approxDiff), Math.sqrt(1 - approxDiff));
    var distance = radiusOfEarth * calculativeDiff; // Distance in km
    return distance.toFixed(2);
  }

  deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  convertToSqlDate(inputStr) {
    if (inputStr != "") {
      var tempDate = inputStr.split(this.constantServices.projectConstants.dateSeparator);
      return tempDate[2] + this.constantServices.projectConstants.dateSeparator + tempDate[1] + this.constantServices.projectConstants.dateSeparator + tempDate[0];
    } else {
      return inputStr;
    }
  }

  getWeekendDaysCount(dString1, dString2) {
    var count = 0;
    var oneDay = 24 * 60 * 60 * 1000;
    for (var d, i = dString1, n = dString2; i <= n; i += oneDay) {
      d = new Date(i).getDay();
      if (d === 6 || d === 0) {
        count++;
      }
    }
    return count;
  }

  getWeekNoOfMonth(date) {
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    return Math.ceil((date.getDate() + firstDay) / 7);
  }

  convertAPIDatetoAppDate(inputStr) {
    if (inputStr != "") {
      var monthArr = ["Start", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
      var tempDate = inputStr.split(this.constantServices.projectConstants.dateSeparator);
      return tempDate[2] + this.constantServices.projectConstants.dateSeparator + monthArr[parseInt(tempDate[1])] + this.constantServices.projectConstants.dateSeparator + tempDate[0];
    } else {
      return inputStr;
    }
  }

  convertAPIDateFormattoAppDate(inputStr) {
    if (inputStr != "") {
      var dateObj = new Date();
      var monthArr = ["Start", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
      var tempDate = inputStr.split(this.constantServices.projectConstants.dateSeparator);
      var year = dateObj.getFullYear();
      if (tempDate[0] == year) {
        return tempDate[2] + " " + monthArr[parseInt(tempDate[1])];
      } else {
        return tempDate[0] + " " + monthArr[parseInt(tempDate[1])];
      }

    } else {
      return inputStr;
    }
  }

  convertAPIDateFormattoAppDatewithyear(inputStr) {
    if (inputStr != "") {
      var dateObj = new Date();
      var monthArr = ["Start", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
      var tempDate = inputStr.split(this.constantServices.projectConstants.dateSeparator);
      var year = dateObj.getFullYear();
      if (tempDate[0] == year) {
        return tempDate[2] + " " + monthArr[parseInt(tempDate[1])] + ", " + tempDate[0];
      } else {
        return tempDate[0] + " " + monthArr[parseInt(tempDate[1])] + ", " + tempDate[2];
      }
    } else {
      return inputStr;
    }
  }

  convertToAppDate(inputStr) {
    if (inputStr != "" && inputStr != undefined) {
      var tempDate = inputStr.split(this.constantServices.projectConstants.dateSeparator);
      var fullDate = ((parseInt(tempDate[0]) < 10) ? "0" + parseInt(tempDate[0]) : tempDate[0]) + this.constantServices.projectConstants.dateSeparator +
        ((parseInt(tempDate[1]) < 10) ? "0" + parseInt(tempDate[1]) : tempDate[1]) + this.constantServices.projectConstants.dateSeparator + tempDate[2];
      return fullDate;
    } else {
      return inputStr;
    }
  }

  getCurrentDateTime() {
    var dateObj = new Date();
    return dateObj.getTime();
    //return dateObj.getFullYear()+this.constantServices.projectConstants.dateSeparator+dateObj.getMonth()+1+this.constantServices.projectConstants.dateSeparator+dateObj.getDate()+" "+dateObj.getHours()+":"+dateObj.getMinutes()+":"+dateObj.getSeconds()+"."+dateObj.getMilliseconds();
  }

  getCurrentTimeFromTimeObj(dateObj) {
    var hour = dateObj.getHours();
    var minute = dateObj.getMinutes();
    var timeZone = ((hour >= 12) ? "PM" : "AM");
    hour = ((hour > 12) ? (hour - 12) : hour);
    var fullTime = ((hour < 10) ? "0" + hour : hour) + ":" + ((minute < 10) ? "0" + minute : minute) + " " + timeZone;
    return fullTime;
  }

  getDateTime(dateObj) {
    var tempDateObj;
    if (this.shareServices.getPlatform() == "iOS") {
      tempDateObj = new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate())
    } else {
      tempDateObj = new Date(dateObj.getFullYear() + this.constantServices.projectConstants.dateSeparator + (dateObj.getMonth() + 1) + this.constantServices.projectConstants.dateSeparator + dateObj.getDate())
    }
    return tempDateObj.getTime();
  }

  getDateTimeFromTimeObj(dateObj, timeObj) {
    var tempDateObj;
    if (this.shareServices.getPlatform() == "iOS") {
      tempDateObj = new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate(), timeObj.getHours(), timeObj.getMinutes());
    } else {
      tempDateObj = new Date(dateObj.getFullYear() + this.constantServices.projectConstants.dateSeparator + (dateObj.getMonth() + 1) + this.constantServices.projectConstants.dateSeparator + dateObj.getDate() + " " + timeObj.getHours() + ":" + timeObj.getMinutes() + ":00.000");
    }
    return tempDateObj.getTime();
  }

  //accepts format: YYYY-MM-DD
  getDateTimeFromDateStr(dateStr) {
    var dateArr = dateStr.split(this.constantServices.projectConstants.dateSeparator)
    var tempDateObj;
    if (this.shareServices.getPlatform() == "iOS") {
      tempDateObj = new Date(parseInt(dateArr[0]), parseInt(dateArr[1]) - 1, parseInt(dateArr[2]))
    } else {
      tempDateObj = new Date(parseInt(dateArr[0]) + this.constantServices.projectConstants.dateSeparator + parseInt(dateArr[1]) + this.constantServices.projectConstants.dateSeparator + parseInt(dateArr[2]));
    }
    return tempDateObj.getTime();
  }

  //accepts format: YYYY-MM-DD HH:MM
  getDateObjFromDateTimeStr(dateStr, timeStr) {
    var dateArr = dateStr.split(this.constantServices.projectConstants.dateSeparator);
    var timeArr = timeStr.split(":");
    var tempDateObj;
    if (this.shareServices.getPlatform() == "iOS") {
      tempDateObj = new Date(parseInt(dateArr[0]), parseInt(dateArr[1]) - 1, parseInt(dateArr[2]), parseInt(timeArr[0]), parseInt(timeArr[1]));
    } else {
      tempDateObj = new Date(dateArr[0] + this.constantServices.projectConstants.dateSeparator + parseInt(dateArr[1]) + this.constantServices.projectConstants.dateSeparator + parseInt(dateArr[2]) + " " + parseInt(timeArr[0]) + ":" + parseInt(timeArr[1]) + ":00.000");
    }
    return tempDateObj;
  }

  //accepts format: YYYY-MM-DD HH:MM(SS)
  getDateTimeFromDateTimeStr(dateStr, timeStr) {
    var dateArr = dateStr.split(this.constantServices.projectConstants.dateSeparator);
    var timeArr = timeStr.split(":");
    var second = "";
    if (this.checkForUndefined(timeArr[2]) == "") {
      second = "00";
    } else {
      second = timeArr[2];
    }
    var tempDateObj;
    if (this.shareServices.getPlatform() == "iOS") {
      tempDateObj = new Date(parseInt(dateArr[0]), parseInt(dateArr[1]) - 1, parseInt(dateArr[2]), parseInt(timeArr[0]), parseInt(timeArr[1]), parseInt(second));
    } else {
      tempDateObj = new Date(dateArr[0] + this.constantServices.projectConstants.dateSeparator + parseInt(dateArr[1]) + this.constantServices.projectConstants.dateSeparator + parseInt(dateArr[2]) + " " + parseInt(timeArr[0]) + ":" + parseInt(timeArr[1]) + ":" + parseInt(second) + ".000");
    }
    return tempDateObj.getTime();
  }

  getCurrentTime() {
    var dateObj = new Date();
    var hour = dateObj.getHours();
    var minute = dateObj.getMinutes();
    var second = dateObj.getSeconds();
    var timeZone = ((hour >= 12) ? "PM" : "AM");
    hour = ((hour > 12) ? (hour - 12) : hour);
    var fullTime = ((hour < 10) ? "0" + hour : hour) + ":" + ((minute < 10) ? "0" + minute : minute) + ":" + ((second < 10) ? "0" + second : second) + " " + timeZone;
    return fullTime;
  }

  getCurrentTime24Hrs() {
    var dateObj = new Date();
    var hour = dateObj.getHours();
    var minute = dateObj.getMinutes();
    var second = dateObj.getSeconds();
    var fullTime = ((hour < 10) ? "0" + hour : hour) + ":" + ((minute < 10) ? "0" + minute : minute) + ":" + ((second < 10) ? "0" + second : second);
    return fullTime;
  }

  getCurrentDate() {
    var dateObj = new Date();
    var day = dateObj.getDate();
    var month = dateObj.getMonth() + 1;
    var year = dateObj.getFullYear();
    var fullDate = ((day < 10) ? "0" + day : day) + this.constantServices.projectConstants.dateSeparator + ((month < 10) ? "0" + month : month) + this.constantServices.projectConstants.dateSeparator + year;
    return fullDate;
  }
  getCurrentDate1() {
    var dateObj = new Date();
    var day = dateObj.getDate();
    var month = dateObj.getMonth() + 1;
    var year = dateObj.getFullYear();
    var fullDate = year + this.constantServices.projectConstants.dateSeparator + ((month < 10) ? "0" + month : month) + this.constantServices.projectConstants.dateSeparator + ((day < 10) ? "0" + day : day) ;
    return fullDate;
  }
  getCurrentDateAppformat() {
    var dateObj = new Date();
    var day = dateObj.getDate();
    var month = dateObj.getMonth() + 1;
    var year = dateObj.getFullYear();
    var fullDate = year + this.constantServices.projectConstants.dateSeparator + ((month < 10) ? "0" + month : month) + this.constantServices.projectConstants.dateSeparator + ((day < 10) ? "0" + day : day);
    return fullDate;
  }
  getCurrentDateFromObj(dateObj) {
    var day = dateObj.getDate();
    var month = dateObj.getMonth() + 1;
    var year = dateObj.getFullYear();
    var fullDate = ((day < 10) ? "0" + day : day) + this.constantServices.projectConstants.dateSeparator + ((month < 10) ? "0" + month : month) + this.constantServices.projectConstants.dateSeparator + year;
    return fullDate;
  }

  getDayFromDateStr(dateStr) {
    var dateArr = dateStr.split(this.constantServices.projectConstants.dateSeparator)
    var tempDateObj = new Date(parseInt(dateArr[0]), parseInt(dateArr[1]) - 1, parseInt(dateArr[2]));
    return tempDateObj.getDay();
  }

  getCurrentTimeHrsMinFromTime(timeStr) {
    var temptime = timeStr.split(":");
    return temptime[0] + ":" + temptime[1];
  }

  //accepts format: new Date().getTime()
  getDateRangeArr(dString1, dString2) {
    var dateRangeArr = [];
    var oneDay = 24 * 60 * 60 * 1000;
    for (var i = dString1, n = dString2; i <= n; i += oneDay) {
      dateRangeArr.push(this.getCurrentDateFromObj(new Date(i)));
    }
    return dateRangeArr;
  }

  getDuration(date, time1, time2) {
    if (date != "" && time1 != "" && time2 != "") {
      var tempDateArr = date.split(this.constantServices.projectConstants.dateSeparator);
      var tempTime1Arr = time1.split(":");
      var tempTime2Arr = time2.split(":");
      var time1Obj, time2Obj;
      if (this.shareServices.getPlatform() == "iOS") {
        time1Obj = new Date(parseInt(tempDateArr[2]), parseInt(tempDateArr[1]) - 1, parseInt(tempDateArr[0])
          , parseInt(tempTime1Arr[0]), parseInt(tempTime1Arr[1]), parseInt(tempTime1Arr[2])).getTime();
        time2Obj = new Date(parseInt(tempDateArr[2]), parseInt(tempDateArr[1]) - 1, parseInt(tempDateArr[0])
          , parseInt(tempTime2Arr[0]), parseInt(tempTime2Arr[1]), parseInt(tempTime2Arr[2])).getTime();
      } else {
        time1Obj = new Date(parseInt(tempDateArr[2]) + this.constantServices.projectConstants.dateSeparator + parseInt(tempDateArr[1]) + this.constantServices.projectConstants.dateSeparator + parseInt(tempDateArr[0])
          + " " + parseInt(tempTime1Arr[0]) + ":" + parseInt(tempTime1Arr[1]) + ":" + parseInt(tempTime1Arr[2]) + ".000").getTime();
        time2Obj = new Date(parseInt(tempDateArr[2]) + this.constantServices.projectConstants.dateSeparator + parseInt(tempDateArr[1]) + this.constantServices.projectConstants.dateSeparator + parseInt(tempDateArr[0])
          + " " + parseInt(tempTime2Arr[0]) + ":" + parseInt(tempTime2Arr[1]) + ":" + parseInt(tempTime2Arr[2]) + ".000").getTime();
      }
      var diff = (time2Obj - time1Obj) / 60000;
      var minutes = diff % 60;
      var hours = (diff / 60) % 24;
      return Math.floor(hours) + "hrs " + Math.floor(minutes) + "min";
    } else {
      return "";
    }
  }

  getDurationInHours(date, time1, time2) {
    if (date != "" && time1 != "" && time2 != "") {
      var tempDateArr = date.split(this.constantServices.projectConstants.dateSeparator);
      var tempTime1Arr = time1.split(":");
      var tempTime2Arr = time2.split(":");
      var time1Obj, time2Obj;
      if (this.shareServices.getPlatform() == "iOS") {
        time1Obj = new Date(parseInt(tempDateArr[2]), parseInt(tempDateArr[1]) - 1, parseInt(tempDateArr[0])
          , parseInt(tempTime1Arr[0]), parseInt(tempTime1Arr[1]), parseInt(tempTime1Arr[2])).getTime();
        time2Obj = new Date(parseInt(tempDateArr[2]), parseInt(tempDateArr[1]) - 1, parseInt(tempDateArr[0])
          , parseInt(tempTime2Arr[0]), parseInt(tempTime2Arr[1]), parseInt(tempTime2Arr[2])).getTime();
      } else {
        time1Obj = new Date(parseInt(tempDateArr[2]) + this.constantServices.projectConstants.dateSeparator + parseInt(tempDateArr[1]) + this.constantServices.projectConstants.dateSeparator + parseInt(tempDateArr[0])
          + " " + parseInt(tempTime1Arr[0]) + ":" + parseInt(tempTime1Arr[1]) + ":" + parseInt(tempTime1Arr[2]) + ".000").getTime();
        time2Obj = new Date(parseInt(tempDateArr[2]) + this.constantServices.projectConstants.dateSeparator + parseInt(tempDateArr[1]) + this.constantServices.projectConstants.dateSeparator + parseInt(tempDateArr[0])
          + " " + parseInt(tempTime2Arr[0]) + ":" + parseInt(tempTime2Arr[1]) + ":" + parseInt(tempTime2Arr[2]) + ".000").getTime();
      }
      var diff = (time2Obj - time1Obj) / 60000;
      var hours = (diff / 60) % 24;
      return hours;
    } else {
      return "";
    }
  }

  getLongDateConvert(dateObj) {
    var myDate = new Date(dateObj);
    return myDate.toDateString();
  }

  formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [day, month, year].join('.');
  }

  reverseString(str: any) {
    // Take empty array revArray
    var strArr = str.split("");
    var revArray = [];
    var length = strArr.length - 1;

    // Looping from the end 
    for (var i = length; i >= 0; i--) {
      revArray.push(strArr[i]);
    }

    // Joining the array elements 
    return revArray.join('');
  }
  getDateTimeFromDateTimeZoneStr(dateStr, timeStr) {
    if (this.checkForUndefined(dateStr) == "") {
      return 0;
    }
    if (this.checkForUndefined(timeStr) == "") {
      timeStr = "00:00:00";
    }
    var dateArr = dateStr.split(this.constantServices.projectConstants.dateSeparator);
    var timeArr = timeStr.split(":");
    var second = "";
    if (this.checkForUndefined(timeArr[2]) == "") {
      second = "00";
    } else {
      second = timeArr[2];
    }
    var hour = timeArr[0];
    var zoneArr = timeArr[1].split(" ");
    var minutes = zoneArr[0];
    if (zoneArr[1] == "PM") {
      if (hour < 12) {
        hour = parseInt(hour) + 12;
      }
    }
    if (zoneArr[1] == "AM") {
      if (hour == 12) {
        hour = "00";
      }
    }
    var tempDateObj;
    if (this.shareServices.getPlatform() == "iOS") {
      tempDateObj = new Date(parseInt(dateArr[0]), parseInt(dateArr[1]) - 1, parseInt(dateArr[2]), parseInt(hour), parseInt(minutes), parseInt(second));
    } else {
      tempDateObj = new Date(dateArr[0] + this.constantServices.projectConstants.dateSeparator + parseInt(dateArr[1]) + this.constantServices.projectConstants.dateSeparator + parseInt(dateArr[2]) + " " + parseInt(hour) + ":" + parseInt(minutes) + ":" + parseInt(second) + ".000");
    }
    return tempDateObj.getTime();
  }
}
