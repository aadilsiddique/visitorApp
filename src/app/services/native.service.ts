import { Injectable } from '@angular/core';

import { DatePicker } from '@ionic-native/date-picker/ngx';
import { Device } from '@ionic-native/device/ngx';
import { Dialogs } from '@ionic-native/dialogs/ngx';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { SpinnerDialog } from '@ionic-native/spinner-dialog/ngx';
import { Network } from '@ionic-native/network/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Toast } from '@ionic-native/toast/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { OpenNativeSettings } from '@ionic-native/open-native-settings/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { File } from '@ionic-native/file/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
// import { FCM } from 'cordova-plugin-fcm-with-dependecy-updated/ionic';

import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { BroadCasteService } from './broadcaste.service'
import { ConstantService } from './constant.service';

@Injectable({
  providedIn: 'root'
})
export class NativeService {

  constructor(
    private datePicker: DatePicker,
    private device: Device,
    private dialogs: Dialogs,
    private iab: InAppBrowser,
    private spinnerDialog: SpinnerDialog,
    private network: Network,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private toast: Toast,
    private constantService : ConstantService
    ) { }







  callDatepickerService(dateObj, onSuccess, onError) {
    this.datePicker.show({
      date: dateObj,
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
    }).then(
      date => {
        console.log('Got date: ', date)
        onSuccess(date);
      },
      err => {
        console.log('Error occurred while getting date: ', err)
        onError(err);
      }
    );
  }

  callTimepickerService(dateObj, onSuccess, onError) {
    this.datePicker.show({
      date: dateObj,
      mode: 'time',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
    }).then(
      date => {
        console.log('Got date: ', date)
        onSuccess(date);
      },
      err => {
        console.log('Error occurred while getting date: ', err)
        onError(err);
      }
    );
  }

  callDeviceService(onSuccess) {
    onSuccess(this.device);
  }

  callDialogService(dialogType, message, title, buttonLabels, defaultText, onSuccess, onError) {
    if (dialogType == "alert") {
      this.dialogs.alert(message, title, buttonLabels)
        .then(() => {
          console.log('Dialog dismissed');
          onSuccess();
        })
        .catch(e => {
          console.log('Error displaying dialog', e);
          onError('Error displaying dialog' + e);
        });
    } else if (dialogType == "confirm") {
      this.dialogs.confirm(message, title, buttonLabels)// (Optional, defaults to [OK,Cancel])
        .then((number) => {
          console.log('confirm dismissed');
          onSuccess(number);
        })
        .catch(e => {
          console.log('Error displaying dialog', e);
          onError('Error displaying dialog' + e);
        });
    } else if (dialogType == "prompt") {
      this.dialogs.prompt(message, title, buttonLabels, defaultText)// (Optional, defaults to [OK,Cancel])
        .then((dialogsPromptCallback) => {
          console.log('prompt dismissed');
          onSuccess(dialogsPromptCallback);
        })
        .catch(e => {
          console.log('Error displaying dialog', e);
          onError('Error displaying dialog' + e);
        });
    }

  }

  callInappBrowserService(url) {
    var browser = this.iab.create(url, '_blank', 'location=no,zoom=yes');
    browser.on('loadstop').subscribe(event => {
      browser.insertCSS({ code: "body{color: red;" });
    });

    // browser.close();
  }



  callSpinnerDialogService(spinnerType, message) {
    if (spinnerType == "show") {
      this.spinnerDialog.show("", message, true);
    } else if (spinnerType == "hide") {
      this.spinnerDialog.hide();
    }
  }


  callSplashScreenService(viewType, onSuccess) {
    if (viewType == "show") {
      this.splashScreen.show();
      onSuccess("Splash Screen Opened");
    } else if (viewType == "hide") {
      this.splashScreen.hide();
      onSuccess("Splash Screen Closed");
    }

  }

  callStatusbarService(actionType, value) {
    if (actionType == "overlay") {
      this.statusBar.overlaysWebView(value);
    } else if (actionType == "bgcolor") {
      this.statusBar.backgroundColorByHexString(value);
    }
  }

  callToastService(message, duration) {
    this.toast.show(message, duration, 'bottom').subscribe(
      toast => {
        //onSuccess(toast);
      }
    );
  }
 callNetworkService(openSetting: any, onSuccess: any, onError: any) {
    if (this.network.type == "none") {
      onError(this.network.type);
      if (openSetting) {
        // this.callToOpenSetting("settings");
      }
    } else {
      onSuccess(this.network.type);
    }
  }
  callCenterToastService(message) {
    this.toast.show(message, '10000', 'center').subscribe(
      toast => {
        //onSuccess(toast);
      }
    );
  }

}
