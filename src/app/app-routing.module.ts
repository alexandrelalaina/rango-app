import { ItensComponent } from './pages/itens-page/itens.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReceitasPageComponent } from './pages/receitas-page/receitas-page.component';

const routes: Routes = [
  {
    path: 'itens',
    component: ItensComponent,
  },
  {
    path: 'receitas',
    component: ReceitasPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
