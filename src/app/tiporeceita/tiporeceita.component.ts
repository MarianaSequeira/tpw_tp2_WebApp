import {Component, OnDestroy, OnInit} from '@angular/core';
import {Receita} from '../receita';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Location} from '@angular/common';
import {PitadinhasService} from '../pitadinhas.service';

@Component({
  selector: 'app-tiporeceita',
  templateUrl: './tiporeceita.component.html',
  styleUrls: ['./tiporeceita.component.css']
})
export class TiporeceitaComponent implements OnInit, OnDestroy {

  tipo: string;
  listReceitas: Receita[];
  navigationSubscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private pitadinhaService: PitadinhasService
  ) {
      this.navigationSubscription = this.router.events.subscribe((e: any) => {
        // If it is a NavigationEnd event re-initalise the component
        if (e instanceof NavigationEnd) {
          this.refresh();
        }
      });
  }

  ngOnInit() {
    this.tipo = this.route.snapshot.paramMap.get('tipo');
  }

  refresh() {
    this.tipo = this.route.snapshot.paramMap.get('tipo');
  }

  ngOnDestroy() {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }
}
