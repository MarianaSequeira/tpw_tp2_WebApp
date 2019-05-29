import { Component, OnInit } from '@angular/core';
import {Receita} from '../receita';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {PitadinhasService} from '../pitadinhas.service';

@Component({
  selector: 'app-userrecipes',
  templateUrl: './userrecipes.component.html',
  styleUrls: ['./userrecipes.component.css']
})
export class UserrecipesComponent implements OnInit {

  minhasReceitas: Receita[];

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private pitadinhaService: PitadinhasService
  ) { }

  ngOnInit() {
    this.getReceita();
  }

  getReceita(): void {
    this.pitadinhaService.getReceitasUtilizador('luispaisalves').subscribe(receita => this.minhasReceitas = receita);
  }


}
