import { Component, OnInit } from '@angular/core';
import { Foto } from '../foto/foto.model';
import { FotoService } from '../foto/foto.service';

@Component({
  selector: 'caelumpic-listagem',
  templateUrl: './listagem.component.html',
  styles: []
})
export class ListagemComponent implements OnInit {

  titulo = "CaelumPic"
  listaFotos: Foto[] = []

  constructor(private servico: FotoService){

    this.servico.listar()
              .subscribe(
                (fotosApi) => {
                  this.listaFotos = fotosApi
                }
              )

  }

  ngOnInit(){}

  removeCard(fotoApagada: Foto){

    this.servico
        .deletar(fotoApagada)
        .subscribe(
          () => {
            /*
            this.listaFotos = this.listaFotos
                                  .filter(
                                    (fotoLista) => {
                                      if(fotoLista != fotoApagada){
                                        return fotoLista
                                      }
                                    }
                                  )
            */

            this.listaFotos = this.listaFotos.filter(fotoLista => fotoLista !== fotoApagada)

            console.log(`Foto ${fotoApagada.titulo} removida com sucesso!`); 
          }
        )



  }

}