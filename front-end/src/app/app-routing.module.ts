import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DesarrolladorPageComponent} from './pages/desarrollador-page/desarrollador-page.component';
import {CrearDesarrolladorPageComponent} from './pages/crear-desarrollador-page/crear-desarrollador-page.component';
import {EditarDesarrolladorPageComponent} from './pages/editar-desarrollador-page/editar-desarrollador-page.component';

const routes: Routes = [
  {
    path: '',
    component: DesarrolladorPageComponent
  },
  {
    path: 'crear-desarrollador',
    component: CrearDesarrolladorPageComponent
  },
  {
    path: 'editar-desarrollador/:id',
    component: EditarDesarrolladorPageComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {useHash: true})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
