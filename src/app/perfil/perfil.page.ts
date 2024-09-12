import { Component, OnInit } from '@angular/core';
import { AccesoService } from '../servicio/acceso.service';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  //vector para traer los datos del php
  persona: any = [];

  cedula : string = "";
  txt_nombre: string = "";
  txt_apellido: string = "";
  txt_correo: string = "";
  txt_clave: string = "";
  txt_cclave : string = "";
  mensaje : string = "";


  codigo : string = "";

  constructor(
    public servicio: AccesoService,
    public navCtrl: NavController

  ) 
  {
    this.servicio.getSession('cod_persona').then((res:any)=>{
      //trae el codigo del servicio
        this.codigo = res;
        this.datospersona();
    });
   }

  ngOnInit() {
  }

  datospersona() {
    let datos = {
        "accion": "dpersona",
        "codigo": this.codigo
    }
    this.servicio.postData(datos).subscribe((res: any) => {
        if (res.estado == true) { // 'estado' es booleano en PHP
            this.persona = res.personas[0]; // Corregir clave de 'persona' a 'personas'

            this.cedula = this.persona.cedula;
            this.txt_nombre = this.persona.nombre;
            this.txt_apellido = this.persona.apellido;
            this.txt_correo = this.persona.correo;
            this.txt_clave = this.persona.clave;
            this.txt_cclave = this.persona.clave;

        } else {
            this.servicio.showToast(res.mensaje);
        }
    });
}
vclave(){
  if(this.txt_clave == this.txt_cclave){
    this.mensaje = "";
  }else{
    this.mensaje = "Las claves no coinciden";
  }
}

cancelar(){

  this.navCtrl.pop();

}
actualizar(){
  let datos = {
    "accion": "aperfil",
    "codigo": this.codigo,
    "nombre": this.txt_nombre,
    "apellido": this.txt_apellido,
    "correo": this.txt_correo,
    "clave": this.txt_clave
}
this.servicio.postData(datos).subscribe((res: any) => {
    if (res.estado == true) { // 'estado' es booleano en PHP
        this.servicio.showToast(res.mensaje);
        this.navCtrl.pop();
    } else {
        this.servicio.showToast(res.mensaje);
    }
});
}

}

