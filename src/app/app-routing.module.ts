import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login/login.component';
import { PartyListComponent } from './components/party-list/party-list/party-list.component';
import { authGuard } from './guards/auth.guard';
import { PartyFormComponent } from './components/party-form/party-form/party-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'parties', component: PartyListComponent, canActivate: [authGuard] },
  { path: 'parties/new', component: PartyFormComponent, canActivate: [authGuard] },
  { path: 'parties/:id', component: PartyFormComponent, canActivate: [authGuard] },
  { path: 'parties/:id/edit', component: PartyFormComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '/parties' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
