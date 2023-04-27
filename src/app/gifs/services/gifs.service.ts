import { Injectable } from '@angular/core';

// importo http para usar todas sus propiedades
import {HttpClient, HttpParams} from '@angular/common/http'
import { SearchGifsResponse, Gifs } from '../interface/gifs.inteface';




// esto signif que sera de modo global, evita que sea especificado en provideIn
// @Injectable({
//   providedIn: 'root'
// })

@Injectable({
  providedIn: 'root'
})


export class GifsService {

  // para probarlo en postman tengo que agregar a la url el signo ?api_key=
  //quedaria asi
  // http://api.giphy.com/v1/gifs/search?api_key=HTBWtVXOtCpMYczarJpDAsZUKM329bBA

  private apiKey: string = 'HTBWtVXOtCpMYczarJpDAsZUKM329bBA'

  // tomo la url de la api para hacer una variable
  // siempre tiene que ser https para que la peticion sea segura
  
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs'

  private _hitorial: string[] = []

  public result: Gifs[] = []



  // el lugar ideal para usar el locastorage es el constr porque se ejecuta una unica vez
  // asique aca se mostrara el historial que se haya guardado en ls
  // uso de http con modulo de angular
  constructor ( private http: HttpClient){

    // if(localStorage.getItem('Historial')){

      // JSON parse hace lo opuesto a stringfy, lo convierte de serializado (objeto o array) a su tipo original
      // desp le digo, si el array es null devolver []
      // this._hitorial = JSON.parse(localStorage.getItem('Historial')!) || []
    // }

    // en una linea lo de arriba
    this._hitorial = JSON.parse(localStorage.getItem('Historial')!) || []





    // mostrar las imagenes guardadas en el localstorage
    this.result = JSON.parse(localStorage.getItem('Imagenes')!) || []
    

  }

    get historial(){
      return [...this._hitorial]
  }


    //string = '' para que siempre tenga un valor

  buscarGifs(query: string = ''){
    
    //valido que el elemto q ingresa no este vacio
    if(query.trim().length === 0){
      return
    }

    //con trim() tambien quito los espacios en blanco de adelante y atras

    query = query.trim().toLowerCase()

    // permito que se agregue un elemento solo si NO esta incluido = !

    if(!this._hitorial.includes(query)){

      this._hitorial.unshift(query)

      // limito la cantidad de insersiones en el historial a 10
       this._hitorial = this._hitorial.splice(0,10)

       // guardo en el LocalStorage con setItem que lleva primero el nombre de la llave y segundo lo que
       //quiero guardar
       // como JSON es un objeto y setItem solo acepta strings puedo usar para 
       // trasformar lo que llega en un string, con stringify

       localStorage.setItem('Historial', JSON.stringify(this._hitorial));
       
    }

    // LLAMADA HTTP CON MODULO
    // get hace la llamada

    // apy_key: mi hash, q: el tema, limit: el limite de busqueda


    // para poder reutilizar de manera mas clara el api_key hay que
    // definirlo en una variable que pueda reutilizar, para eso
    // uso el modulo HttpParams de '@angular/common/http'
    // los parametros lo puedo ver en postman tmb
    // cada elemento de la api la asigno a los paramentros

    const params = new HttpParams()
        .set('api_key', this.apiKey)
        .set('limit', '10')
        .set('q', query);
        

    // reemplazo las comillas del http por `` y agrego $ para pasar la propiedad query
    // asigno el tipo de dato que devolvera get : <SearchGifsResponse>
    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`, {params})
      //el endpoint seria el search
        
      //subscribe es parecido al them(), se va a ejecutar cuando tenga la resolucion del get
      // (resp: any es para que no controle el tipo de dato que llegara)
      .subscribe( (resp)=> {
        // console.log(resp.data)


        // la data la almceno en el servicio como una propiedad
        // result
        this.result = resp.data;

        localStorage.setItem('Imagenes', JSON.stringify(this.result));

        
        
      })





    //LAMDADA HTTP con js

    // fetch('http://api.giphy.com/v1/gifs/search?api_key=HTBWtVXOtCpMYczarJpDAsZUKM329bBA&q=Messi')
      //regresa una promesa .then
      // .then(resp => {
      // pasa por.json que tiene otra promesa
      //   resp.json().then(data => {
      //     console.log(data);
      //   })
      // } )

      
  }







}
