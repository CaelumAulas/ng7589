import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FotoModule } from "./foto.module";

@Injectable({
    providedIn: FotoModule
})
export class FotoService {
    
    private url = 'http://localhost:3000/v1/fotos/'

    constructor(private conexaoApi: HttpClient){}

    listar(){
        return this.conexaoApi.get(this.url)
    }

    cadastrar(){}

    deletar(){}

    atualizar(){}

    buscar(){}

}