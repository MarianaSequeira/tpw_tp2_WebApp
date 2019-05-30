import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InitialpageComponent } from './initialpage/initialpage.component';
import { ReceitadetailsComponent } from './receitadetails/receitadetails.component';
import { PesquisaComponent } from './pesquisa/pesquisa.component';
import { TiporeceitaComponent } from './tiporeceita/tiporeceita.component';
import { ProfileComponent } from './profile/profile.component';
import { ReceitastagComponent } from './receitastag/receitastag.component';
import {AdicionarreceitaComponent} from './adicionarreceita/adicionarreceita.component';


const routes: Routes = [
  {path: '', component: InitialpageComponent},
  {path: 'receita/:id', component: ReceitadetailsComponent},
  {path: 'pesquisa/:query', component: PesquisaComponent},
  {path: 'tiporeceita/:tipo', component: TiporeceitaComponent},
  {path: 'perfil', component: ProfileComponent},
  {path: 'receitastag/:tag', component: ReceitastagComponent},
  {path: 'criarReceita', component: AdicionarreceitaComponent}
];

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
    RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})
  ]
})
export class AppRoutingModule { }
