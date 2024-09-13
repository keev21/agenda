import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AccesoService } from '../servicio/acceso.service';
AccesoService


@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.page.html',
  styleUrls: ['./contacto.page.scss'],
})
export class ContactoPage implements OnInit {
  txt_nombre: String ="";
  txt_apellido: String ="";
  txt_telefono: String ="";
  txt_email: String ="";
  mensaje: String="";
  cod_persona: String="";

  constructor(
    public navCtrl: NavController,
    public servicio: AccesoService

  )
   {
    this.servicio.getSession('cod_persona').then((res:any)=>{
      //trae el codigo del servicio
        this.cod_persona = res;
       
    });

    }

  ngOnInit() {
  }
  guardar(){
    //verificar datos vacios y el mensaje vacio
    if(this.txt_nombre=="" || this.txt_apellido=="" || this.txt_telefono=="" || this.txt_email=="" ||this.mensaje!=""){
      this.servicio.showToast("Debe llenar todos los campos"); 
      return;
    }
    let datos ={
      "accion": "nuevoc",
      "nombre": this.txt_nombre,
      "apellido": this.txt_apellido,
      "telefono": this.txt_telefono,
      "email": this.txt_email,
      "cod_persona": this.cod_persona

    };
    this.servicio.postData(datos).subscribe(
      (res:any) =>{
        if(res.estado==true){
          this.servicio.showToast(res.mensaje);
          this.navCtrl.back();
          
        }else{
          this.mensaje = res.mensaje;
        }
      }
    );


  }
  cancelar(){
  this.navCtrl.navigateRoot('/contactos');

  }
  verificartelefonoemail(){
    //con accion 
    let datos ={
      "accion": "verificartelefonoemail",
      "telefono": this.txt_telefono,
      "email": this.txt_email,
      "cod_persona": this.cod_persona

    };
    this.servicio.postData(datos).subscribe(
      (res:any) =>{
        if(res.estado==true){
          this.mensaje = res.mensaje;
          

        }else{
          this.mensaje = res.mensaje;
        }
      }
    );


  }

}
