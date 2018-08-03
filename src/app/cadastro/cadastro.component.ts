import { Component, OnInit } from '@angular/core';
import { Foto } from "../foto/foto.model";
import { FotoService } from '../foto/foto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ListagemComponent } from '../listagem/listagem.component';
import { Mensagem, MensagemTipo } from '../mensagem/mensagem.model';

@Component({
  selector: 'caelumpic-cadastro',
  templateUrl: './cadastro.component.html',
  styles: []
})
export class CadastroComponent implements OnInit {

  foto = new Foto()
  mensagem = new Mensagem()

  constructor( private service: FotoService
              ,private rotaAtivada: ActivatedRoute
              ,private roteador: Router){}

  ngOnInit(){

    /* this.rotaAtivada.params.subscribe(
      parametros => console.log(parametros.fotoId)
    ) */

    let fotoId = this.rotaAtivada.snapshot.params.fotoId
    
    if(fotoId){
      this.service
          .buscar(fotoId)
          .subscribe(
            fotoApi => this.foto = fotoApi
          )
    }
  }

  salvar(){

    if(this.foto._id){

      this.service
          .atualizar(this.foto)
          .subscribe(
            (resposta) => {
              this.mensagem.conteudo = `${this.foto.titulo} alterada com sucesso!`
              this.mensagem.tipo = MensagemTipo.success

              setTimeout(
                () => this.roteador.navigate([ListagemComponent])
                ,1000
              )
              

            }
          )

    }
    else{

      this.service.cadastrar(this.foto)
          .subscribe(
            (sucesso) => {
              this.mensagem.conteudo = `${this.foto.titulo} salva com sucesso!`
              this.mensagem.tipo = MensagemTipo.success

              this.foto = new Foto()
            }
            ,(erro) => console.log(erro)
            ,() => console.log(this.foto)
          ) 
    }

  }
}