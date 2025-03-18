import { NgModule } from '@angular/core';
import {RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AddUserComponent } from './components/add-user/add-user.component'; // Importa el nuevo componente


export const routes: Routes =  [
    { path: '', component: AppComponent },
    { path: 'create', component: AddUserComponent },  // Nueva ruta para agregar usuario
  ];

  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }