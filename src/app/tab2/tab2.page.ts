import { Component, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  messages = [
    {
      user: 'Becky',
      createdAt: 1557792798010,
      msg: 'Hola Miguel, como estas?'
    },
    {
      user: 'mike',
      createdAt: 1557792798010,
      msg: 'Hola Becky, bien y tu como estas?'
    }
  ];

  currentUser = 'mike';
  newMsg = '';
  @ViewChild(IonContent) content: IonContent;

  constructor(){

  }

  sendMessage() {
    this.messages.push({
      user: 'mike',
      createdAt: new Date().getTime(),
      msg: this.newMsg,

      
    });
    
    this.newMsg = '';
 
    setTimeout(() => {
      this.content.scrollToBottom(200);
    });
  }

}
