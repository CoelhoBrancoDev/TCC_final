import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { Home } from './home/home';

export const routes: Routes = [
  { 
    path: '', 
    component: Home,
    pathMatch: 'full'
  },{ 
    path: '', 
    component: AppComponent,
    pathMatch: 'full',
    data: { title: 'Super Atleta - Plataforma de Scouting' }
  },
  { 
    path: 'catalogo', 
    component: CatalogoComponent,
    pathMatch: 'full',
    data: { title: 'Catálogo de Atletas - Super Atleta' }
  }
];