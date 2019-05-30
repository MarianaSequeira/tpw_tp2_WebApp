import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {PitadinhasService} from '../pitadinhas.service';
import {Tags} from '../Tags';
import {FormBuilder, FormGroup, FormControl, FormArray, Validators} from '@angular/forms';
import {Receita} from '../receita';

@Component({
  selector: 'app-adicionarreceita',
  templateUrl: './adicionarreceita.component.html',
  styleUrls: ['./adicionarreceita.component.css']
})
export class AdicionarreceitaComponent implements OnInit {

  tipos: ['Sopa', 'Carne', 'Peixe', 'Acompanhamento', 'Vegetariano', 'Sobremesa', 'Massas', 'Entrada'];
  dificuldade: ['Muito Fácil', 'Fácil', 'Médio', 'Difícil', 'Muito Difícil'];
  unidades: ['unidade', 'mL', 'L', 'g', 'kg', 'chávena', 'c. sopa', 'c. chá', 'c. café', 'qb'];

  receitaForm: FormGroup;
  tagReceita = [
    {id: 1, name: 'vapor'},
    {id: 2, name: 'grelhado'},
    {id: 3, name: 'estufado'},
    {id: 4, name: 'vegetais'},
    {id: 5, name: 'salada'},
    {id: 6, name: 'molhos'},
    {id: 7, name: 'doces'},
    {id: 8, name: 'vegetariano'},
    {id: 9, name: 'salteado'},
    {id: 10, name: 'frito'},
    {id: 11, name: 'cozido'},
    {id: 12, name: 'tartes'},
    {id: 13, name: 'pizza'},
    {id: 14, name: 'massas'},
    {id: 15, name: 'carne'},
    {id: 16, name: 'sem leite'},
    {id: 17, name: 'microondas'},
    {id: 18, name: 'frio'},
    {id: 19, name: 'braseado'},
    {id: 20, name: 'sopas'},
    {id: 21, name: 'peixe'},
    {id: 22, name: 'marisco'},
    {id: 23, name: 'bebida'},
    {id: 24, name: 'sem glúten'},
    {id: 25, name: 'guisado'},
    {id: 26, name: 'forno'},
    {id: 27, name: 'assado'},
    {id: 28, name: 'sanduiches'},
    {id: 29, name: 'ovos'},
    {id: 30, name: 'frutas'},
    {id: 31, name: 'arroz'},
    {id: 32, name: 'sabores mediterrânicos'},
  ];

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private pitadinhaService: PitadinhasService,
    private formBuilder: FormBuilder
  ) {
    this.receitaForm = this.formBuilder.group({
      nomeReceita: new FormControl(''),
      descricaoReceita: new FormControl(''),
      preparacaoReceita: new FormControl(''),
      tipoReceita:  new FormControl(''),
      nivelReceita: new FormControl(''),
      tempoReceita: new FormControl(''),
      dosesReceita: new FormControl(''),
      imagemReceita: new FormControl('', [Validators.required]),
      tagReceita: new FormArray([])
    });

    this.addCheckboxes();
  }

  ngOnInit() {
  }

  onSubmit() {
    console.warn(this.receitaForm.value);
    console.warn(this.receitaForm.value.nomeReceita);

    const receita = new Receita();

    receita.nome = this.receitaForm.value.nomeReceita;
    receita.descricao = this.receitaForm.value.descricaoReceita;
    receita.preparacao = this.receitaForm.value.preparacaoReceita;
    receita.tipo = this.receitaForm.value.tipoReceita;
    receita.dificuldade = this.receitaForm.value.nivelReceita;
    receita.tempo = this.receitaForm.value.tempoReceita;
    receita.dose = this.receitaForm.value.dosesReceita;
    receita.imagem = this.receitaForm.value.imagemReceita;

    this.pitadinhaService.postReceita(receita).subscribe(() => this.goBack());
  }

  addCheckboxes() {
    this.tagReceita.map((o, i) => {
      const control = new FormControl(i === 0); // if first item set to true, else false
      (this.receitaForm.controls.tagReceita as FormArray).push(control);
    });
  }

  goBack(): void {
    this.location.back();
  }
}
