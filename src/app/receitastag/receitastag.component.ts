import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {PitadinhasService} from '../pitadinhas.service';

@Component({
  selector: 'app-receitastag',
  templateUrl: './receitastag.component.html',
  styleUrls: ['./receitastag.component.css']
})
export class ReceitastagComponent implements OnInit {

  tag: string;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private pitadinhaService: PitadinhasService
  ) { }

  ngOnInit() {
    this.tag = this.route.snapshot.paramMap.get('tag');
  }

}
