import { Component, OnInit } from '@angular/core';
import { Foto } from "../foto/foto.model";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'caelumpic-cadastro',
  templateUrl: './cadastro.component.html',
  styles: []
})
export class CadastroComponent implements OnInit {

  foto = new Foto()

  constructor(private conexaoApi: HttpClient){}

  ngOnInit(){}

  salvar(){
    /*
    let cabecalho = new HttpHeaders()
    cabecalho.append('Content-Type','application/json')

    let options = {
      headers: cabecalho
    }
    */

    this.conexaoApi
        .post(
          'http://localhost:3000/v1/fotos'
          ,this.foto
        )
        .subscribe(
          (sucesso) => console.log(sucesso)
          ,(erro) => console.log(erro)
          ,() => console.log(this.foto)
        ) 
  }
}