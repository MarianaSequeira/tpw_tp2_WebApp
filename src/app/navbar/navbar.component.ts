import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {PitadinhasService} from '../pitadinhas.service';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  searchForm: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private pitadinhaService: PitadinhasService,
    private formBuilder: FormBuilder
  ) {
    this.searchForm = this.formBuilder.group({
      query: new FormControl('')
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    this.router.navigate(['pesquisa'], {
      state: { query: this.searchForm.value.query }
    });
  }

}
