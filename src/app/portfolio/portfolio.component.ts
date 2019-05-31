import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Receita} from '../receita';
import {PitadinhasService} from '../pitadinhas.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit, OnDestroy {
  @Input() staticdata: string;
  receitas: Receita[];
  navigationSubscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private pitadinhasService: PitadinhasService
  ) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.staticdata = this.route.snapshot.paramMap.get('tipo');
      }
    });
  }

  ngOnInit() {
    if (this.staticdata === 'initialpage') {
      this.getReceitasMaisLikes();
    } else {
      this.getReceitasTipo();
    }
  }

  ngOnDestroy() {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  getReceitasMaisLikes(): void {
    this.pitadinhasService.getReceitas('like').subscribe(receitas => this.receitas = receitas);
  }

  getReceitasTipo(): void {
    this.pitadinhasService.getReceitas(this.staticdata).subscribe(receitas => this.receitas = receitas);
  }
}
