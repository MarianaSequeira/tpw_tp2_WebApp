import { Component, OnInit } from '@angular/core';
import { Receita } from '../receita';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PitadinhasService } from '../pitadinhas.service';
import { Ingrediente } from '../Ingrediente';
import {Tags} from '../Tags';

@Component({
  selector: 'app-receitadetails',
  templateUrl: './receitadetails.component.html',
  styleUrls: ['./receitadetails.component.css']
})
export class ReceitadetailsComponent implements OnInit {

  receita: Receita;
  listPassos: string[];
  listIngredientes: Ingrediente[];
  listTags: Tags[];

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private pitadinhaService: PitadinhasService
  ) { }

  ngOnInit() {
    this.getReceita();
  }

  getReceita(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.pitadinhaService.getReceitaById(id).subscribe(receita => this.receita = receita);
    this.pitadinhaService.getReceitaById(id).subscribe(receita => this.listPassos = receita.preparacao.split(/[0-9]\. /).slice(1));
    this.pitadinhaService.getIngredientes(id).subscribe(listIngredientes => this.listIngredientes = listIngredientes);
    this.pitadinhaService.getTagsReceita(id).subscribe(listTags => this.listTags = listTags);
  }

}
