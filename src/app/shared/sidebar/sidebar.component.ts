import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';
import { Gifs } from '../../gifs/interface/gifs.inteface';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  
    constructor(private histo: GifsService){

    }
    get history(){
      return this.histo.historial
    }

    buscar(argumento: string){
    
      // envio del gif service el resultado

      this.histo.buscarGifs(argumento)

    }

  }

