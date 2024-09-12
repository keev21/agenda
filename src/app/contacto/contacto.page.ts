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

  constructor(
    public navCtrl: NavController,
    public servicio: AccesoService

  ) { }

  ngOnInit() {
  }
  guardar(){
    

  }
  cancelar(){
  this.navCtrl.navigateRoot('/contactos');

  }

}
