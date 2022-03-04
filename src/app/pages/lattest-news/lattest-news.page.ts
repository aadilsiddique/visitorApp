import { Component, OnInit } from '@angular/core';
import { ApiHandlerService } from 'src/app/services/api-handler.service';
import { NativeService } from 'src/app/services/native.service';

@Component({
  selector: 'app-lattest-news',
  templateUrl: './lattest-news.page.html',
  styleUrls: ['./lattest-news.page.scss'],
})
export class LattestNewsPage implements OnInit {
  articlesArr=[]
  articleObj = {
    "author": "",
    "srcname": "",
    "title": "",
    "description": "",
    "date": "",
    "time": "",
    "urlToImage": "",
    "url": "",
    "content": "",
  }
  constructor(
    public nativeServices : NativeService,
    public apiHandlerService : ApiHandlerService

  ) {

   }

  ngOnInit() {
  }
  ionViewDidEnter() {
    console.log("LattestNewsPage")
    this.getNews();
  }

  getNews(){
       
    var ref = this;
    ref.nativeServices.callNetworkService(false,function (success: any) {
      ref.nativeServices.callSpinnerDialogService("show", "Fetching News Please Wait");
      ref.apiHandlerService.getAuthorDetails(function (successResponse: any) {
        if (successResponse["status"] == "ok") {
          if (successResponse["articles"].length > 0) {
            
            for (var i = 0; i < successResponse["articles"].length; i++) {
              ref.articleObj={
                "author": "",
                "srcname": "",
                "title": "",
                "description": "",
                "date": "",
                "time": "",
                "urlToImage": "",
                "url": "",
                "content": "",
              }
              ref.articleObj.author=successResponse.articles[i].author;
              ref.articleObj.srcname=successResponse.articles[i]["source"].name;
              ref.articleObj.title=successResponse.articles[i].title;
              ref.articleObj.description=successResponse.articles[i].description;
              ref.articleObj.urlToImage=successResponse.articles[i].urlToImage;
              ref.articleObj.url=successResponse.articles[i].url;
              ref.articleObj.content=successResponse.articles[i].content;
              var tempDate = successResponse.articles[i].publishedAt.split("T");
              ref.articleObj.date =  tempDate[0]
              ref.articleObj.time =  tempDate[1]
              ref.articlesArr.push(ref.articleObj);
            }
            ref.nativeServices.callSpinnerDialogService("hide", "Fetching News Please Wait");
          } else {
            ref.nativeServices.callToastService("No data Available", "short")
          }
          ref.nativeServices.callSpinnerDialogService("hide", "Fetching News Please Wait");
        }
        else{
          ref.nativeServices.callSpinnerDialogService("hide", "Fetching News Please Wait");
          ref.nativeServices.callToastService("Server not available ", "short")
        }
        ref.nativeServices.callSpinnerDialogService("hide", "Fetching News Please Wait");
      }, function (errorResponse: any) {
      });
    }, function (onError) {
      ref.nativeServices.callToastService("Mobile data is off", "short")
    });
  }

  openWeb(item){
    var url = item.url
    this.nativeServices.callInappBrowserService(url)
  }

 
}

