import { Component, OnInit } from '@angular/core';
import { Foto } from "../foto/foto.model";
import { FotoService } from '../foto/foto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ListagemComponent } from '../listagem/listagem.component';
import { Mensagem, MensagemTipo } from '../mensagem/mensagem.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'caelumpic-cadastro',
  templateUrl: './cadastro.component.html',
  styles: []
})
export class CadastroComponent implements OnInit {

  foto = new Foto()
  mensagem = new Mensagem()
  formCadastro: FormGroup

  constructor( private service: FotoService
              ,private rotaAtivada: ActivatedRoute
              ,private roteador: Router
              ,private formBuilder: FormBuilder){}

  ngOnInit(){

    this.formCadastro = this.formBuilder.group({
      titulo: ['', Validators.compose([
        Validators.required,
        Validators.minLength(5)
      ])],
      url: ['', Validators.required],
      descricao: ''
    })

    /* this.rotaAtivada.params.subscribe(
      parametros => console.log(parametros.fotoId)
    ) */

    let fotoId = this.rotaAtivada.snapshot.params.fotoId
    
    if(fotoId){
      this.service
          .buscar(fotoId)
          .subscribe(
            fotoApi => {
              this.foto = fotoApi
              this.formCadastro.patchValue(fotoApi)
            }
          )
    }
  }

  salvar(){

    //spread operator
    this.foto = {...this.foto, ...this.formCadastro.value}

    if(this.foto._id){

      this.service
          .atualizar(this.foto)
          .subscribe(
            (resposta) => {
              this.mensagem.conteudo = `${this.foto.titulo} alterada com sucesso!`
              this.mensagem.tipo = MensagemTipo.success

              setTimeout(
                () => this.roteador.navigate([ListagemComponent])
                ,3000
              )
              

            }
          )

    }
    else{

      this.service.cadastrar(this.foto)
          .subscribe(
            (objetoApi) => {
              this.mensagem.conteudo = `${this.foto.titulo} salva com sucesso!`
              this.mensagem.tipo = MensagemTipo.success

              console.log(objetoApi);
              

              this.formCadastro.reset()
            
            }
            ,(erro) => console.log(erro)
            ,() => console.log(this.foto)
          ) 
    }

  }

  get titulo(){
    return this.formCadastro.get('titulo')
  }

  get url() {
    return this.formCadastro.get('url')
  }
}