import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { Home } from './home/home';
import { QuemSomosComponent } from './quem-somos/quem-somos.component';
import { ContatoComponent } from './contato/contato.component';
import { DashboardComponent } from './dashboard/dashboard.component';



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
  },

  { 
  path: 'quem-somos', 
  component: QuemSomosComponent,
  pathMatch: 'full',
  data: { title: 'Quem Somos - Super Atleta' }
},
{ 
  path: 'contato', 
  component: ContatoComponent,
  pathMatch: 'full',
  data: { title: 'Contato - Super Atleta' }
},

{ 
  path: 'dashboard', 
  component: DashboardComponent,
  pathMatch: 'full',
  data: { title: 'Dashboard Analítico - Super Atleta' }
},

];