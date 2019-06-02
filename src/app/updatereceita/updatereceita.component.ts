import {AfterViewInit, Component, DoCheck, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../User';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {PitadinhasService} from '../pitadinhas.service';
import {AuthenticationService} from '../AuthenticationService';
import {Receita} from '../receita';
import {Ingrediente} from '../Ingrediente';




@Component({
  selector: 'app-updatereceita',
  templateUrl: './updatereceita.component.html',
  styleUrls: ['./updatereceita.component.css']
})
export class UpdatereceitaComponent implements OnInit {

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
  ingredientesList: FormArray;
  tagsSelected = [];
  receita: Receita;
  currentUser: User;
  ingredientesReceita: Ingrediente[];

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
    const idReceita = +this.route.snapshot.paramMap.get('id');
    this.pitadinhaService.getReceitaById(idReceita).subscribe(receita => {
      this.receita = receita;
      this.receitaForm = this.formBuilder.group({
        nomeReceita: new FormControl(this.receita.nome),
        descricaoReceita: new FormControl(this.receita.descricao),
        preparacaoReceita: new FormControl(this.receita.preparacao),
        tipoReceita:  new FormControl(this.receita.tipo),
        nivelReceita: new FormControl(this.receita.dificuldade),
        tempoReceita: new FormControl(this.receita.tempo),
        dosesReceita: new FormControl(this.receita.dose),
        imagemReceita: new FormControl('', [Validators.required]),
        ingredientes: this.formBuilder.array([]),
        tagReceita: new FormArray([])
      });
      this.addCheckboxes();
      this.ingredientesList = this.receitaForm.get('ingredientes') as FormArray;
      this.pitadinhaService.getIngredientes(idReceita).subscribe(ingredientes => this.addListIngredientes(ingredientes));
    });
  }

  ngOnInit() {


  }

  onSubmit() {
    console.warn('submit');
    const id = +this.route.snapshot.paramMap.get('id');
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
    // tslint:disable-next-line:max-line-length
    this.pitadinhaService.updateReceita(id, nome, descricao, preparacao, tipoReceita, nivel, tempo, dose, imagem, this.currentUser.username, ingredientes, this.tagsSelected).subscribe(() => this.goBack());
  }

  addCheckboxes() {
    this.tagReceita.map((o, i) => {
      const control = new FormControl(i === 0); // if first item set to true, else false
      (this.receitaForm.controls.tagReceita as FormArray).push(control);
    });
  }

  createIngrediente(nome: string, quantidade: number, unidade: string): FormGroup {
    console.warn('aqui');
    return this.formBuilder.group({
      ingrediente: [nome, null],
      quantidade: [quantidade, null],
      unidade: [unidade, null]
    });
  }

  addIngrediente() {
    this.ingredientesList.push(this.createIngrediente('', 0, 'sem unidade'));
  }

  addListIngredientes(ingredientesReceita: Ingrediente[]) {
    for (const ingrediente of ingredientesReceita) {
      this.ingredientesList.push(this.createIngrediente(ingrediente.ingredienteName, ingrediente.ingredienteQuant, ingrediente.unidade));
    }
  }

  removeIngrediente(index){
    this.ingredientesList.removeAt(index);
  }

  goBack(): void {
    this.location.back();
  }

}
