import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Receita} from './receita';
import {Ingrediente} from './Ingrediente';
import {Tags} from './Tags';

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

  postReceita(receita: Receita): Observable<any> {
    const url = this.baseUrl + 'addreceita';
    return this.http.post(url, receita, httpOptions);
  }
}
