import { Component, OnInit } from '@angular/core';
import { AccesoService } from '../servicio/acceso.service';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.page.html',
  styleUrls: ['./contactos.page.scss'],
})
export class ContactosPage implements OnInit {
  nombre: String ="";
  telefono: String ="";
  contactos: any=[];
  cod_persona:String= "";

  constructor(
    public servicio: AccesoService,
    private navCtrl: NavController

  ) { 
    this.servicio.getSession('cod_persona').then((res:any)=>{
      this.cod_persona=res;
      this.lcontactos();
    });

  }

  ngOnInit() {
  }
  irEditar(cod_contacto:string){
    
    this.navCtrl.navigateRoot(['editar-contacto']);
    this.servicio.createSession('cod_contacto',cod_contacto);
  }
  irEliminar(cod_contacto:string){

    this.navCtrl.navigateRoot(['econtacto']);
    this.servicio.createSession('cod_contacto',cod_contacto);
  }
  nuevo(){
    this.navCtrl.navigateRoot(['contacto']);
   
  }
  //cargar contactos
  lcontactos(){
    let datos={
      "accion": "lcontactos",
      codigo:this.cod_persona
    };
    this.servicio.postData(datos).subscribe((res:any)=>{
      if(res.estado==true){
        this.contactos=res.contactos;
      }
      else{
        this.servicio.showToast(res.mensaje);
      }
    })

    }
   
   
  }


