import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
})


export class BusquedaComponent {

  // @ViewChild('txtBuscar') sirve para buscar elementos a partir
  // de etiquetas, clases o identificadores
  //desp le pongo nombre a esa propiedad txtBuscar
  // va a ir al html a buscar y lo va a asignar al elemento
  // con el que lo llame, txt\
  //debo indicarle el tipo HTMLInput a ElementRef por
  // sino es generico



  @ViewChild('txtBuscar') txtB!:ElementRef<HTMLInputElement>;

  // como estoy seguro que ElementRef va a existir siempre 
  // porq es parte de html uso ! para que lo deje pasar


  //KeyboardEvent es el tipo de evento keyup
  // buscar(evento:KeyboardEvent){
  //   console.log(evento)
  // }

  // lo mando desde el html


  // inyecto el servicio
  // creo la prop en el constr gifsServicios
  // una vez hecho tengo acceso a todos sus metodos y propiedades

  constructor(private gifsServicios: GifsService){}

  buscar(){
      const valor = this.txtB.nativeElement.value
      // console.log(valor)


      this.gifsServicios.buscarGifs(valor)

     this.txtB.nativeElement.value = ''

      // va a mostrar nativeElement que es todo el elemento
      // html, es del tipo de dato ElementRef
    }
}
