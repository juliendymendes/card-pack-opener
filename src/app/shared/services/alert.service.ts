import { Injectable } from '@angular/core';
import { AlertType, IAlertConfig } from '../types/Alert';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  feedbackOptions: IAlertConfig = {
    type: 'error',
    message: "",
    visible: false
  };
  constructor() { }

  showAlert(message: string, type: AlertType ){
    this.feedbackOptions = {
      visible: true,
      message,
      type
    }

    setTimeout(() => {
      this.hideAlert()
    }, 3000)
  }

  hideAlert(){
   this.feedbackOptions = {
      type: 'error',
      message: "",
      visible: false
    };
  }
}
