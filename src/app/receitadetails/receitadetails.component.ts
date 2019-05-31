import { Component, OnInit } from '@angular/core';
import { Receita } from '../receita';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PitadinhasService } from '../pitadinhas.service';
import { Ingrediente } from '../Ingrediente';
import {Tags} from '../Tags';
import {Comentario} from '../Comentario';
import {User} from '../User';
import {AuthenticationService} from '../AuthenticationService';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Extrainfo} from '../extrainfo';


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
  listComentarios: Comentario[];
  extrainfo: Extrainfo;
  currentUser: User;
  comentarioForm: FormGroup;
  saveForm: FormGroup;
  likeForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private pitadinhaService: PitadinhasService,
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.comentarioForm = this.formBuilder.group({
      descricao: new FormControl(''),
    });
    this.saveForm = this.formBuilder.group({
      save: new FormControl(''),
    });
    this.likeForm = this.formBuilder.group({
      like: new FormControl(''),
    });
  }

  ngOnInit() {
    this.getReceita();
    this.getComentarios();
    this.getExtrainfo();
  }

  getReceita(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.pitadinhaService.getReceitaById(id).subscribe(receita => this.receita = receita);
    this.pitadinhaService.getReceitaById(id).subscribe(receita => this.listPassos = receita.preparacao.split(/[0-9]\. /).slice(1));
    this.pitadinhaService.getIngredientes(id).subscribe(listIngredientes => this.listIngredientes = listIngredientes);
    this.pitadinhaService.getTagsReceita(id).subscribe(listTags => this.listTags = listTags);
    this.pitadinhaService.getExtraInfo(id).subscribe(extrainfo => this.extrainfo = extrainfo);
  }

  getComentarios(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.pitadinhaService.getComentariosReceita(id).subscribe(listComentarios => this.listComentarios = listComentarios);
  }

  getExtrainfo(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.pitadinhaService.getExtraInfo(id).subscribe(extrainfo => this.extrainfo = extrainfo);
  }

  onSubmit() {
    console.warn(this.comentarioForm.value);
    const id = +this.route.snapshot.paramMap.get('id');
    // tslint:disable-next-line:max-line-length
    this.pitadinhaService.postComentario(this.comentarioForm.value.descricao, id, this.currentUser.username).subscribe(() => this.getComentarios());
  }

  onSubmitSave() {
    console.warn(this.comentarioForm.value);
    const id = +this.route.snapshot.paramMap.get('id');
    this.pitadinhaService.postSave(id, this.currentUser.username).subscribe(() => this.getExtrainfo());
  }

  onSubmitLike() {
    console.warn(this.comentarioForm.value);
    const id = +this.route.snapshot.paramMap.get('id');
    this.pitadinhaService.postLike(id, this.currentUser.username).subscribe(() => this.getExtrainfo());
  }
}
