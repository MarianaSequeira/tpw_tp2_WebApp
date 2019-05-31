import { Component, OnInit } from '@angular/core';
import {Receita} from '../receita';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {PitadinhasService} from '../pitadinhas.service';
import {Subscription} from 'rxjs';
import {User} from '../User';
import {AuthenticationService} from '../AuthenticationService';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-userrecipes',
  templateUrl: './userrecipes.component.html',
  styleUrls: ['./userrecipes.component.css']
})
export class UserrecipesComponent implements OnInit {
  currentUser: User;
  currentUserSubscription: Subscription;
  minhasReceitas: Receita[];
  deleteForm: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private pitadinhaService: PitadinhasService,
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder
  ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });

    this.deleteForm = this.formBuilder.group({
      idReceita: new FormControl('')
    });
  }

  ngOnInit() {
    this.getReceita();
  }

  getReceita(): void {
    console.log(this.currentUser.username)
    this.pitadinhaService.getReceitasUtilizador(this.currentUser.username).subscribe(receita => this.minhasReceitas = receita);
  }

  deleteReceita(receita: Receita): void {
    this.pitadinhaService.deleteReceita(receita).subscribe(() => this.getReceita());
  }
}
