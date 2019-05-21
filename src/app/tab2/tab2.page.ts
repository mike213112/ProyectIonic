import { Component, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { PersonaService } from '../service/persona.service';
import { NotificationService } from '../service/notification.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  data: any;

  messages = [
    {
      /*user: 'Becky',
      createdAt: 1557792798010,
      msg: 'Hola Miguel, como estas?'
    */},
    {
      /*user: 'Mike',
      createdAt: 1557792798010,
      msg: 'Hola Becky, bien y tu como estas?'
    */}
  ];

  currentUser = 'Mike';
  newMsg = '';
  @ViewChild(IonContent) content: IonContent;

  constructor(personaService: PersonaService, 
              notificationService: NotificationService){

    this.data = {
      user: 'Mike',
      createdAt: '',
      msg: ''
    }
      
  }

  sendMessage() {
    this.messages.push({
      user: 'Mike',
      createdAt: new Date().getTime(),
      msg: this.newMsg,

      
    });
    
    this.newMsg = '';
 
    setTimeout(() => {
      this.content.scrollToBottom(200);
    });
  }

}
