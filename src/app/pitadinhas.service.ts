import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Receita} from './receita';
import {Ingrediente} from './Ingrediente';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class PitadinhasService {

  private baseUrl = 'http://127.0.0.1:8000/';

  constructor(private http: HttpClient) { }

  getReceitasMaisLikes(): Observable<Receita[]> {
    const url = this.baseUrl + 'receitasmaislikes';
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
}
