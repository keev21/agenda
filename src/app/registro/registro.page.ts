import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AccesoService } from '../servicio/acceso.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  txt_cedula: string = '';
  txt_nombre: string = '';
  txt_apellido: string = '';
  txt_correo: string = '';
  txt_clave: string = '';
  txt_cclave: string = '';
  mensaje: string = "";


  constructor(
    public modalCtrl: ModalController,
    public servicioCtrl: AccesoService

  ) { }

  ngOnInit() {
  }

  vclave(){
    if(this.txt_clave == this.txt_cclave){
      this.mensaje = "";
    }else{
      this.mensaje = "Las claves no coinciden";
    }

  }

  registrar(){
    
    if(this.mensaje!=""){
      this.servicioCtrl.showToast("Las claves no coinciden");
    }
    else if(this.txt_cedula=="" || 
    this.txt_nombre=="" ||
    this.txt_apellido=="" ||
    this.txt_correo=="" ||
    this.txt_clave=="" ||
    this.txt_cclave=="" 

    ){
      this.servicioCtrl.showToast("Faltan datos");
    }
    else{
      let datos= 
      {
        "accion": "insertar",
        "cedula": this.txt_cedula,
        "correo": this.txt_correo,
        "clave": this.txt_clave,
        "nombre": this.txt_nombre,
        "apellido": this.txt_apellido
       
      }
      this.servicioCtrl.postData(datos).subscribe((res:any)=>{
        if(res.estado==true){
          this.modalCtrl.dismiss();
          this.servicioCtrl.showToast(res.mensaje);
         
        }
        else{
          this.servicioCtrl.showToast(res.mensaje);
        }
      });
      
    }

  }
  cancelar(){
    //para ocultar el modal
    this.modalCtrl.dismiss();
  }
  vcedula(){
    let datos={
      "accion":"vcedula",
      "cedula":this.txt_cedula
    }
    this.servicioCtrl.postData(datos).subscribe((res:any)=>{
      if(res.estado == true){
        this.servicioCtrl.showToast(res.mensaje);
      }else{
        this.servicioCtrl.showToast(res.mensaje);
      }
    })
    }

}
