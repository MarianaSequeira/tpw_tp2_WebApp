import { Component, OnInit } from '@angular/core';
import {Receita} from '../receita';
import {PitadinhasService} from '../pitadinhas.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {

  receitas: Receita[];

  constructor(private pitadinhasService: PitadinhasService) { }

  ngOnInit() {
    this.getReceitasMaisLikes();
  }

  getReceitasMaisLikes(): void {
    this.pitadinhasService.getReceitasMaisLikes().subscribe(receitas => this.receitas = receitas);
  }

}
