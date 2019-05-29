import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {InitialpageComponent} from './initialpage/initialpage.component';
import { ReceitadetailsComponent } from './receitadetails/receitadetails.component';


const routes: Routes = [
  {path: '', component: InitialpageComponent},
  {path: 'receita/:id', component: ReceitadetailsComponent}

]

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
