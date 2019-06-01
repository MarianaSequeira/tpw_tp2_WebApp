import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Receita} from './receita';
import {Ingrediente} from './Ingrediente';
import {Tags} from './Tags';
import {Comentario} from './Comentario';
import {Extrainfo} from './extrainfo';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class PitadinhasService {

  private baseUrl = 'http://127.0.0.1:8000/';

  constructor(private http: HttpClient) { }

  getReceitas(tipo: string): Observable<Receita[]> {
    const url = this.baseUrl + 'receitatipo?tipo=' + tipo;
    return this.http.get<Receita[]>(url);
  }

  getReceitaById(id: number): Observable<Receita> {
    const url = this.baseUrl + 'receita?id=' + id;
    return this.http.get<Receita>(url);
  }

  getIngredientes(id: number): Observable<Ingrediente[]> {
    const url = this.baseUrl + 'ingredientesreceita?id=' + id;
    return this.http.get<Ingrediente[]>(url);
  }

  getReceitasUtilizador(username: string): Observable<Receita[]> {
    const url = this.baseUrl + 'receitasutilizador?utilizador=' + username;
    return this.http.get<Receita[]>(url);
  }

  getReceitasGuardadas(username: string): Observable<Receita[]> {
    const url = this.baseUrl + 'receitasguardadas?utilizador=' + username;
    return this.http.get<Receita[]>(url);
  }

  getTagsReceita(id: number): Observable<Tags[]> {
    const url = this.baseUrl + 'tagsreceita?id=' + id;
    return this.http.get<Tags[]>(url);
  }

  getTagsReceitas(tag: string): Observable<Receita[]> {
    const url = this.baseUrl + 'receitastag?tag=' + tag;
    return this.http.get<Receita[]>(url);
  }

  postReceita(nome: string, descricao: string, preparacao: string, tipoReceita: string, nivel: string, tempo: number, dose: number, imagem: any, utilizador: string, ingredientes: any, tags: string[]): Observable<any> {
    const url = this.baseUrl + 'addreceita';
    console.warn(imagem)
    return this.http.post(url, {nome, descricao, preparacao, tipoReceita, nivel, tempo, dose, imagem, utilizador, ingredientes, tags }, httpOptions);
  }

  getSearchResult(query: string, tagsSelected?: string[]): Observable<Receita[]> {
    console.log('query service: ' + query + '... tagsSelected: ' + tagsSelected);

    let url = this.baseUrl + 'pesquisar?query=' + query;
    if (tagsSelected) {
      for (const tag of tagsSelected) {
        url += '&tags=' + tag;
      }
    }

    console.log(url);
    return this.http.get<Receita[]>(url);
  }

  deleteReceita(receita: Receita): Observable<any> {
    const url = this.baseUrl + 'deletereceita/' + receita.id;
    console.log(url);
    return this.http.delete<Receita>(url, httpOptions);
  }

  getComentariosReceita(id: number): Observable<Comentario[]> {
    const url = this.baseUrl + 'comentariosreceita?id=' + id;
    return this.http.get<Comentario[]>(url);
  }

  // tslint:disable-next-line:variable-name
  postComentario(comentario: string, id_receita: number, utilizador: string): Observable<any> {
    const url = this.baseUrl + 'comentar';
    return this.http.post(url, {comentario, id_receita, utilizador}, httpOptions);
  }

  postSave(id: number, utilizador: string): Observable<any> {
    const url = this.baseUrl + 'guardarreceita';
    return this.http.post(url, {id, utilizador}, httpOptions);
  }

  postLike(id: number, utilizador: string): Observable<any> {
    const url = this.baseUrl + 'gostarreceita';
    return this.http.post(url, {id, utilizador}, httpOptions);
  }

  getExtraInfo(id: number): Observable<Extrainfo> {
    const url = this.baseUrl + 'extrainfo?id=' + id;
    return this.http.get<Extrainfo>(url);
  }
}
