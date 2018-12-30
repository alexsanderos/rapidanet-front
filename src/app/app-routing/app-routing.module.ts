import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '', redirectTo: 'admin', pathMatch: 'full' },
    ])
  ],
  declarations: [],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
