import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { SettingsComponent } from './settings/settings.component';


const routes: Routes = [
  { path: 'settings', component: SettingsComponent },
  { path: '', component: IndexComponent, pathMatch: 'full' },
  { path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
