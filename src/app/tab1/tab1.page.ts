import { AfterViewInit ,Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PersonaService } from '../service/persona.service';
import { NotificationService } from '../service/notification.service';
import { observable } from 'rxjs';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  data: any;

  constructor(
    private personaService: PersonaService,
    private notificationService: NotificationService,
  ){

    this.data = {
      user: '',
      msg: '',
      edad: null
    }

  }


}