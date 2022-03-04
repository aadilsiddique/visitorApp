import { Injectable } from '@angular/core';
import { ConstantService } from './constant.service';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root'
})
export class ApiHandlerService {

  constructor(public utilServices: UtilService,
    public constants: ConstantService,
    ) { }

  
    getAuthorDetails(onSuccess: any, onError: any) {
      const proxyUrl = "https://cors-anywhere.herokuapp.com/"
      var date = this.utilServices.getCurrentDate1();
      this.utilServices.callGetAPI(proxyUrl+"https://newsapi.org/v2/everything?q=bitcoin&from="+date+"&sortBy=publishedAt&apiKey=1848b5465b1449d78d10c2991b1bea98",
        function (successCallBack: any) {
          onSuccess(successCallBack);
        }, function (errorCallBack: any) {
          onError(errorCallBack);
        });
    }

 
  }