import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { SettingsComponent } from './settings/settings.component';
import { LicenseComponent } from './license/license.component';
import { ThirdPartyLicensesComponent } from './third-party-licenses/third-party-licenses.component';


const routes: Routes = [
  { path: 'settings', component: SettingsComponent },
  { path: 'license', component: LicenseComponent },
  { path: 'third-party-licenses', component: ThirdPartyLicensesComponent },
  { path: '', component: IndexComponent, pathMatch: 'full' },
  { path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
