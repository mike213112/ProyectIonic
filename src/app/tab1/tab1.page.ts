import { AfterViewInit ,Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PersonaService } from '../service/persona.service';
import { NotificationService } from '../service/notification.service';
//import { FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
//import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  //public formGroup: FormGroup;
  private mensaje: String = null;
  public mySubject: BehaviorSubject<any>;
  public mySubject2: BehaviorSubject<any>;
  data: any;

  constructor(
    private personaService: PersonaService,
    private notificationService: NotificationService,
  ){

    this.mySubject = new BehaviorSubject(null);

    this.data = {
      nombre: '',
      apellido: '',
      apodo: '',
      correo: '',
      direccion: ''    
    }

  }

  public enviarFormulario(data): void {
    console.log(data);
   
    let datosAEnviar: any = {
      nombre: data.nombre,
      apellido: data.apellido,
      apodo: data.apodo,
      correo: data.correo,
      direccion: data.direccion
    };
      
    console.log('Datos a enviar:' + JSON.stringify(datosAEnviar));
    this.personaService.create(datosAEnviar).subscribe(result => {
      console.log('Datos desde el serve:' + JSON.stringify(result));
    });

  }

  public actualizarFormulario(data): void {
    console.log(data);

    let datosAEnviar: any = {
      nombre: data.nombre,
      apellido: data.apellido,
      apodo: data.apodo,
      correo: data.correo,
      direccion: data.direccion
    };

    console.log('Datos a modificar:' + JSON.stringify(datosAEnviar));
    this.personaService.update(datosAEnviar).subscribe(result => {
      console.log('Datos desde el serve:' + JSON.stringify(result));
    });

  }

  public MostraDatos(data): void {
    console.log(data);

    let datosAEnviar: any = {
      nombre: data.nombre,
      apellido: data.apellido,
      apodo: data.apodo,
      correo: data.correo,
      direccion: data.direccion
    };

    console.log('Registro de las personas:' + JSON.stringify(datosAEnviar));

    this.personaService.getAll(datosAEnviar).subscribe(result =>{
      console.log('Datos desde el serve:' + JSON.stringify(result));
    });

  }

  private handleMessageReceived(message: any): void {
    console.log('Menseje recibido' + JSON.stringify(message));
    this.mySubject.next(message);
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

  private initData(data) {
    
    /*this.formGroup = new FormGroup({
      nombre: new FormControl('', []
      ),
      apellido: new FormControl('', []
      ),
      apodo: new FormControl('', []
      ),
      correo: new FormControl('', []
      ),
      direccion: new FormControl('', []
      ),
    });*/

    this.data = ({
      nombre: data.nombre,
      apellido: data.apellido,
      apodo: data.apodo,
      correo: data.correo,
      direccion: data.direccion
    });

  }

  public ProcesarMySubject(result: any): void{
    console.log('hacer algo con: ' + JSON.stringify(result));
    this.mensaje = this.mensaje + '' + JSON.stringify(result);
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

    this.mySubject.subscribe((result) => {
      this.ProcesarMySubject(result)
    });

    this.personaService
      .personaList(null)
      .subscribe((result) => {
        console.log('Resultado:' + JSON.stringify(result));
      });
  }

}