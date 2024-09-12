import { Component } from '@angular/core';
import { AccesoService } from '../servicio/acceso.service';
//nav controller
import { ModalController, NavController } from '@ionic/angular';
//aqui llamo a la pagina
import { RclavePage } from '../rclave/rclave.page';
import { RegistroPage } from '../registro/registro.page';





@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  txt_usuario: string="";
  txt_clave: string="";

    //SE DECLARA EL SERVICIO
  constructor(
    public servicio: AccesoService, 
    public navCtrl: NavController, 
    public modalCtrl: ModalController
    ) 
    {}


  loggin(){
    let datos={
      accion:'loggin',
      usuario: this.txt_usuario,
      clave: this.txt_clave
    }

   this.servicio.postData(datos).subscribe((res:any)=>{
      if(res.estado=true){
        this.servicio.createSession("cod_persona", res.persona[0].codigo);
        this.servicio.createSession("nombre_persona", res.persona[0].nombre);
        this.servicio.showToast(res.mensaje);
        //poner como principal
        this.navCtrl.navigateRoot(['/menu']);
      }else{
        this.servicio.showToast(res.mensaje);
      }
   });
    
  }
  async recuperar(){
    const modal= await this.modalCtrl.create({
      //aqui llamo a la pagina que se muestre
      component:RclavePage
    });
    return await modal.present();
  }

  async registro(){
    const modal= await this.modalCtrl.create({
      component:RegistroPage
    });
    return await modal.present();
  }


  

}
