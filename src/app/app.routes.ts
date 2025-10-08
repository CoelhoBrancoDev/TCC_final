import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CatalogoComponent } from './catalogo/catalogo.component';

export const routes: Routes = [
  { 
    path: '', 
    component: AppComponent,
    data: { title: 'Super Atleta - Plataforma de Scouting' }
  },
  { 
    path: 'catalogo', 
    component: CatalogoComponent,
    data: { title: 'Catálogo de Atletas - Super Atleta' }
  },
  { 
    path: '**', 
    redirectTo: '',
    pathMatch: 'full'
  }
];