import { AdminDashboard1Component } from './../admin-dashboard1/admin-dashboard1.component';
import { AdminComponent } from './../admin.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EnderecoComponent } from '../endereco/endereco.component';
import { PessoaComponent } from '../pessoa/pessoa.component';
import { PessoaFormComponent } from '../pessoa-form/pessoa-form.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'admin',
        component: AdminComponent,
        children: [
          {
            path: '',
            redirectTo: 'dashboard1',
            pathMatch: 'full'
          },
          {
            path: 'dashboard1',
            component: AdminDashboard1Component
          },
          {
            path: 'pessoa-form/:id',
            component: PessoaFormComponent
          },
          {
            path: 'pessoa',
            component: PessoaComponent
          },
          {
            path: 'endereco/:id',
            component: EnderecoComponent
          }
        ]
      }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule { }
