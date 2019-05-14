import { Component, OnInit } from '@angular/core';
import { PersonaService } from '../service/persona.service';
import { NotificationService } from '../service/notification.service';

@Component({
  selector: 'app-datos',
  templateUrl: './datos.page.html',
  styleUrls: ['./datos.page.scss'],
})
export class DatosPage implements OnInit {

  data: any;

  constructor(private personaService: PersonaService,
              private notificationService: NotificationService) { 

    this.data = {
      nombre: '',
      apellido: '',
      edad: null,
    }

  }

  public enviarFormulario(data): void {
    console.log(data);
    /*this.messages.push({
      user: 'mike',
      createdAt: new Date().getTime(),
      msg: this.newMsg,
    });

    this.newMsg = '';

    setTimeout(() => {
      this.content.scrollToBottom(200);
    });*/
    let datosAEnviar: any = {
      primerNombre: data.nombre,
      segundoNombre: data.apellido,
      edad: data.edad
    };
      
    console.log('Datos a enviar:' + JSON.stringify(datosAEnviar));
    this.personaService.create(datosAEnviar).subscribe(result => {
      console.log('Datos desde el serve:' + JSON.stringify(result));
    });

  }

  public actualizarFormulario(data): void {
    console.log(data);

    let datosAEnviar: any = {
      primerNombre: data.nombre,
      segundoNombre: data.apellido,
      edad: data.edad
    };

    console.log('Datos a enviar:' + JSON.stringify(datosAEnviar));
    this.personaService.update(datosAEnviar).subscribe(result => {
      console.log('Datos desde el serve:' + JSON.stringify(result));
    });

  }

  private initData(data): void {
    this.data = ({
      nombre: data.nombre,
      apellido: data.apellido,
      edad: data.edad
    });
  }

  private handleMessageReceived(message: any): void {
    console.log('Menseje recibido' + JSON.stringify(message));
  }

  public doNotificationSubscription(): void{

    try{
      this.notificationService.getPersonaNotification().subscribe((result) =>{
        this.handleMessageReceived(result);
      });
    } catch(e){
      console.log(e);
    }
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    console.log('on after view');
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    console.log('on destroy');
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log('on init');

    this.doNotificationSubscription();

    this.initData(this.data);    

    this.personaService
      .personaList(null)
      .subscribe((result) => {
        console.log('Resultado:' + JSON.stringify(result));
      });
  }

}



