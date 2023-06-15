import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { PublicacionesComponent } from './publicaciones/publicaciones.component';
import { PublicacionService } from './publicaciones/publicacion.service';
import { UsuarioService } from './usuarios/usuario.service';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormComponent } from './publicaciones/form/form.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { DetalleComponent } from './publicaciones/detalle/detalle.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { LoginComponent } from './usuarios/login/login.component';
import { RegisterComponent } from './usuarios/register/register.component';
import { EditComponent } from './usuarios/edit/edit.component';
import { UserDetalleComponent } from './usuarios/detalle/detalle.component';


const routes: Routes = [
  {path: '', redirectTo: '/welcome', pathMatch: 'full'},
  {path: 'welcome', component: WelcomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'publicaciones', component: PublicacionesComponent},
  {path: 'publicaciones/nueva', component: FormComponent},
  {path: 'publicaciones/:nombre', component: PublicacionesComponent},
  {path: 'publicaciones/editar/:id', component: FormComponent},
  {path: 'publicaciones/detalle/:id', component: DetalleComponent},
  {path: 'usuarios/editar/:id', component: EditComponent},
  {path: 'usuarios/:id', component: UserDetalleComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    WelcomeComponent,
    PublicacionesComponent,
    FormComponent,
    DetalleComponent,
    UserDetalleComponent,
    UsuariosComponent,
    LoginComponent,
    RegisterComponent,
    EditComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
