import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { LoginPartialComponent } from './login-partial/login-partial.component';
import { InitialpageComponent } from './initialpage/initialpage.component';
import { AppRoutingModule } from './app-routing.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { ReceitadetailsComponent } from './receitadetails/receitadetails.component';
import { PesquisaComponent } from './pesquisa/pesquisa.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TiporeceitaComponent } from './tiporeceita/tiporeceita.component';
import { UserrecipesComponent } from './userrecipes/userrecipes.component';
import { RecipestableComponent } from './recipestable/recipestable.component';
import { ProfileComponent } from './profile/profile.component';
import { ReceitastagComponent } from './receitastag/receitastag.component';
import { AdicionarreceitaComponent } from './adicionarreceita/adicionarreceita.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { LoginComponent } from './login/login.component';
import {JwtInterceptor} from './_helpers/jwt.interceptor';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PortfolioComponent,
    LoginPartialComponent,
    InitialpageComponent,
    ReceitadetailsComponent,
    PesquisaComponent,
    TiporeceitaComponent,
    UserrecipesComponent,
    RecipestableComponent,
    ProfileComponent,
    ReceitastagComponent,
    AdicionarreceitaComponent,
    FileUploadComponent,
    LoginComponent,
    SignupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
