import { NgModule } from '@angular/core';
import { Routes,RouterModule} from '@angular/router';
import {HomeComponent} from './Components/home/home.component'
import {ProfileComponent} from './Components/profile/profile.component'
import {RegisterComponent} from './Components/register/register.component'
import {DashboardComponent} from './Components/dashboard/dashboard.component'
import { LoginComponent } from './Components/login/login.component';
import { LogoutComponent } from './Components/logout/logout.component';

const appRoutes: Routes = [
  {path: 'profile', component: ProfileComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LogoutComponent},
  {path: '', component: HomeComponent},
  {path: '**', component: HomeComponent}
  
]


@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes)],
  providers: [],
  bootstrap: [],
  exports:[RouterModule]
})
export class AppRoutingModule { }
