import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {PitadinhasService} from '../pitadinhas.service';
import {FormBuilder, FormGroup, FormControl, FormArray, Validators} from '@angular/forms';
import {User} from '../User';
import {AuthenticationService} from '../AuthenticationService';

@Component({
  selector: 'app-adicionarreceita',
  templateUrl: './adicionarreceita.component.html',
  styleUrls: ['./adicionarreceita.component.css']
})
export class AdicionarreceitaComponent implements OnInit {

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
  ingredientesList: FormArray;
  tagsSelected = [];
  valid: string;

  currentUser: User;

  get ingredientesFormGroup() {
    return this.receitaForm.get('ingredientes') as FormArray;
  }

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private pitadinhaService: PitadinhasService,
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.receitaForm = this.formBuilder.group({
      nomeReceita: new FormControl('', [Validators.required]),
      descricaoReceita: new FormControl('', [Validators.required]),
      preparacaoReceita: new FormControl('', [Validators.required]),
      tipoReceita:  new FormControl('', [Validators.required]),
      nivelReceita: new FormControl('', [Validators.required]),
      tempoReceita: new FormControl('', [Validators.required]),
      dosesReceita: new FormControl('', [Validators.required]),
      imagemReceita: new FormControl('', [Validators.required]),
      ingredientes: this.formBuilder.array([this.createIngrediente()], [Validators.required]),
      tagReceita: new FormArray([], [Validators.required])
    });

    this.ingredientesList = this.receitaForm.get('ingredientes') as FormArray;
    this.addCheckboxes();
  }

  ngOnInit() {
  }

  onSubmit() {
    console.warn('submit');
    const nome = this.receitaForm.value.nomeReceita;
    const descricao = this.receitaForm.value.descricaoReceita;
    const preparacao = this.receitaForm.value.preparacaoReceita;
    const tipoReceita = this.receitaForm.value.tipoReceita;
    const nivel = this.receitaForm.value.nivelReceita;
    const tempo = this.receitaForm.value.tempoReceita;
    const dose = this.receitaForm.value.dosesReceita;
    const imagem = this.receitaForm.value.imagemReceita;
    const ingredientes = this.receitaForm.value.ingredientes;
    const tagsInfo = this.receitaForm.value.tagReceita;
    // tslint:disable-next-line:no-shadowed-variable
    for (const {item, index} of tagsInfo.map((item, index) => ({ item, index }))) {
      if ( item === true) {
        for (const info of this.tagReceita) {
          if ((info.id - 1) === index) {
            this.tagsSelected.push(info.name);
          }
        }
      }
    }

    if (this.receitaForm.valid) {
      this.valid = null;
      // tslint:disable-next-line:max-line-length
      this.pitadinhaService.postReceita(nome, descricao, preparacao, tipoReceita, nivel, tempo, dose, imagem, this.currentUser.username, ingredientes, this.tagsSelected).subscribe(() => this.goBack());
    } else {
      this.valid = 'Formulário Inválido. Verifique os campos inseridos e certifique-se de que todos se encontram preenchidos';
    }
 }

  addCheckboxes() {
    this.tagReceita.map((o, i) => {
      const control = new FormControl(i === 0); // if first item set to true, else false
      (this.receitaForm.controls.tagReceita as FormArray).push(control);
    });
  }

  createIngrediente(): FormGroup {
    return this.formBuilder.group({
      ingrediente: [null, null],
      quantidade: [null, null],
      unidade: ['unidade(s)', null]
    });
  }

  addIngrediente() {
    this.ingredientesList.push(this.createIngrediente());
  }

  removeIngrediente(index): void {
    this.ingredientesList.removeAt(index);
  }

  goBack(): void {
    this.location.back();
  }

  get nomeReceita() {return this.receitaForm.get('nomeReceita'); }
  get descricaoReceita() {return this.receitaForm.get('descricaoReceita'); }
  get preparacaoReceita() {return this.receitaForm.get('preparacaoReceita'); }
  get tipoReceita() {return this.receitaForm.get('tipoReceita'); }
  get nivelReceita() {return this.receitaForm.get('nivelReceita'); }
  get tempoReceita() {return this.receitaForm.get('tempoReceita'); }
  get dosesReceita() {return this.receitaForm.get('dosesReceita'); }
  get imagemReceita() {return this.receitaForm.get('imagemReceita'); }
  get ingredientes() {return this.receitaForm.get('ingredientes'); }
  get tagsReceita() {return this.receitaForm.get('tagReceita'); }
}
