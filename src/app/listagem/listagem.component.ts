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
  listaFotos

  constructor(private servico: FotoService){

    this.servico.listar()
              .subscribe(
                (fotosApi) => {
                  this.listaFotos = fotosApi
                }
              )

  }

  ngOnInit(){}

  removeCard(foto: Foto){
    console.log(`Foto ${foto.titulo} removida com sucesso!`); 
  }

}