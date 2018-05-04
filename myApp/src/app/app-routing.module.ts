import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { HelpComponent } from './components/help/help.component';
import { HomeComponent } from './components/home/home.component';
import { UseraccountComponent } from './components/useraccount/useraccount.component';
import { UserinfoComponent } from './components/userinfo/userinfo.component';
import { EulaComponent } from './components/eula/eula.component';
import { ProgressComponent } from './components/progress/progress.component';
import { HomewithsessionComponent } from './components/homewithsession/homewithsession.component';
import { HeaderComponent } from './components/header/header.component';

const routes: Routes = [
    { path: '', component: RegisterComponent },
    { path: "help", component: HelpComponent },
    { path: "home", component: HomeComponent },
    { path: "account", component: UseraccountComponent },
    { path: "register", component: RegisterComponent },
    { path: "userinfo", component: UserinfoComponent },
    { path: "eula", component: EulaComponent },
    { path: "progress", component: ProgressComponent },
    { path: "session", component: HomewithsessionComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
