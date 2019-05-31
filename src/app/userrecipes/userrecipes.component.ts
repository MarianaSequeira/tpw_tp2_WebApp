import { Component, OnInit } from '@angular/core';
import {Receita} from '../receita';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {PitadinhasService} from '../pitadinhas.service';
import {Subscription} from 'rxjs';
import {User} from '../User';
import {AuthenticationService} from '../AuthenticationService';

@Component({
  selector: 'app-userrecipes',
  templateUrl: './userrecipes.component.html',
  styleUrls: ['./userrecipes.component.css']
})
export class UserrecipesComponent implements OnInit {
  currentUser: User;
  currentUserSubscription: Subscription;
  minhasReceitas: Receita[];

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
    this.getReceita();
  }

  getReceita(): void {
    console.log(this.currentUser.username)
    this.pitadinhaService.getReceitasUtilizador(this.currentUser.username).subscribe(receita => this.minhasReceitas = receita);
  }


}
