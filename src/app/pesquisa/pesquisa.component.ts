import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Location} from '@angular/common';
import {PitadinhasService} from '../pitadinhas.service';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Receita} from '../receita';

@Component({
  selector: 'app-pesquisa',
  templateUrl: './pesquisa.component.html',
  styleUrls: ['./pesquisa.component.css']
})
export class PesquisaComponent implements OnInit, OnDestroy {

  query: string;
  queryResult: Receita[];
  filtroForm: FormGroup;
  tags = [
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
  navigationSubscription;
  tagsSelected = [];

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
          console.log('query: ' + this.query);
          this.doSearch();
        } catch (e) {}
      }
    });

    this.filtroForm = this.formBuilder.group({
      tags: new FormArray([])
    });
    this.addCheckboxes();
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  addCheckboxes() {
    this.tags.map((o, i) => {
      const control = new FormControl(i === 0); // if first item set to true, else false
      (this.filtroForm.controls.tags as FormArray).push(control);
    });
  }

  doSearch(): void {
    this.pitadinhaService.getSearchResult(this.query).subscribe(queryResult => this.queryResult = queryResult);
  }

  onSubmit(): void {
    const tagsInfo = this.filtroForm.value.tags;
    // tslint:disable-next-line:no-shadowed-variable
    for (const {item, index} of tagsInfo.map((item, index) => ({ item, index }))) {
      if ( item === true) {
        for (const info of this.tags) {
          if ((info.id - 1) === index) {
            this.tagsSelected.push(info.name);
          }
        }
      }
    }

    this.pitadinhaService.getSearchResult(this.query, this.tagsSelected).subscribe(queryResult => this.queryResult = queryResult);
    this.tagsSelected = [];
  }


}
