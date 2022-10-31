import { Component } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import {
  AlertController,
  NavController,
  ToastController,
} from '@ionic/angular';
import { IHerramienta } from '../interfaces/IHerramienta.interface';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  herramientas: IHerramienta[] = [
    {
      id: 1,
      nombre: 'Martillo',
      imagenUrl: 'https://ionicframework.com/docs/img/demos/card-media.png',
    },
    {
      id: 2,
      nombre: 'Desarmador',
      imagenUrl: 'https://ionicframework.com/docs/img/demos/card-media.png',
    },
    {
      id: 3,
      nombre: 'Pala',
      imagenUrl: 'https://ionicframework.com/docs/img/demos/card-media.png',
    },
    {
      id: 4,
      nombre: 'Hacha',
      imagenUrl: 'https://ionicframework.com/docs/img/demos/card-media.png',
    },
  ];

  herramientasCarrito: IHerramienta[] = [];
  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private navController: NavController
  ) {}

  guardarHerramientaLocalStorage(herramienta: IHerramienta): void {
    let existeHerramienta = this.validarExisteHerramientaEnCarrito(
      herramienta.id
    );
    if (existeHerramienta) {
      this.crearAlertController(herramienta);
    } else {
      this.herramientasCarrito.push(herramienta);
      this.crearToastController();
      console.log(this.herramientasCarrito);
    }
  }

  private validarExisteHerramientaEnCarrito(id: number): boolean {
    let existeHerramienta = this.herramientasCarrito.some(
      (herramienta) => herramienta.id === id
    );

    return existeHerramienta;
  }

  private async crearAlertController(herramienta: IHerramienta) {
    const alert = await this.alertController.create({
      header: '¿Agregar Nuevamente?',
      message: 'Esta herramienta ya se encuentra en el carrito de orden',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Agregar',
          role: 'confirm',
          handler: () => {
            this.herramientasCarrito.push(herramienta);
            this.crearToastController();
          },
        },
      ],
    });
    await alert.present();
  }

  private async crearToastController() {
    const toast = await this.toastController.create({
      message: 'Herramienta agregada correctamente',
      duration: 2000,
      position: 'bottom',
    });
    await toast.present();
  }
}
