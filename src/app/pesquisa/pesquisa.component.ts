import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Location} from '@angular/common';
import {PitadinhasService} from '../pitadinhas.service';
import {FormBuilder} from '@angular/forms';
import {Receita} from '../receita';

@Component({
  selector: 'app-pesquisa',
  templateUrl: './pesquisa.component.html',
  styleUrls: ['./pesquisa.component.css']
})
export class PesquisaComponent implements OnInit, OnDestroy {

  query: string;
  queryResult: Receita[];
  navigationSubscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private pitadinhaService: PitadinhasService,
    private formBuilder: FormBuilder
  ) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        try {
          this.query = this.router.getCurrentNavigation().extras.state.query;
          this.doSearch();
        } catch (e) {}
      }
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  doSearch(): void {
    this.pitadinhaService.getSearchResult(this.query).subscribe(queryResult => this.queryResult = queryResult);
  }
}
