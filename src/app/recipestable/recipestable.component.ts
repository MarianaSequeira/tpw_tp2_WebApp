import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {PitadinhasService} from '../pitadinhas.service';
import {Receita} from '../receita';
import {User} from '../User';
import {Subscription} from 'rxjs';
import {AuthenticationService} from '../AuthenticationService';

@Component({
  selector: 'app-recipestable',
  templateUrl: './recipestable.component.html',
  styleUrls: ['./recipestable.component.css']
})
export class RecipestableComponent implements OnInit {
  @Input() staticdata: string;
  currentUser: User;
  currentUserSubscription: Subscription;
  receitasGuardadas: Receita[];

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private pitadinhaService: PitadinhasService,
    private authenticationService: AuthenticationService
  ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
    if (this.staticdata === 'receitastag') {

      this.getReceitas();
    } else {
      this.getReceita();
    }
  }

  getReceita(): void {
    this.pitadinhaService.getReceitasGuardadas(this.currentUser.username).subscribe(receita => this.receitasGuardadas = receita);
  }

  getReceitas(): void {
    const tag = this.route.snapshot.paramMap.get('tag');
    console.log('aqui: ' + tag);
    this.pitadinhaService.getTagsReceitas(tag).subscribe(receitasGuardadas => this.receitasGuardadas = receitasGuardadas);
  }

}
