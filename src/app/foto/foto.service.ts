import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FotoModule } from "./foto.module";
import { Foto } from "./foto.model";
import { Observable } from "rxjs";

@Injectable({
    providedIn: FotoModule
})
export class FotoService {
    
    private url = 'http://localhost:3000/v1/fotos/'

    constructor(private conexaoApi: HttpClient){}

    listar(): Observable<Foto[]> {
        return this.conexaoApi.get<Foto[]>(this.url)
    }

    cadastrar(foto: Foto): Observable<string>{
        return this.conexaoApi.post<string>(this.url,foto)
    }

    deletar(foto: Foto): Observable<Object> {
        return this.conexaoApi.delete(this.url+foto._id)
    }

    buscar(fotoId: string): Observable<Foto> {
        return this.conexaoApi.get<Foto>(this.url+fotoId)
    }
    
    atualizar(foto: Foto): Observable<HttpResponse<Object>> {
        return this.conexaoApi.put(this.url+foto._id, foto, {observe: 'response'}) 
    }

}