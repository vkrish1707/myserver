import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HeaderComponent } from '../components/header/header.component';
import { MenuComponent } from '../components/menu/menu.component';
import { ProfileComponent } from '../components/profile/profile.component';
import { UseraccountComponent } from '../components/useraccount/useraccount.component';
import { HelpComponent } from '../components/help/help.component';
import { EulaComponent } from '../components/eula/eula.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule.forRoot()
  ],
  declarations: [
    HeaderComponent,
    MenuComponent,
    ProfileComponent,
    UseraccountComponent,
    HelpComponent,
    EulaComponent,
  ],
  exports: [
    HeaderComponent
  ]
})
export class AppHeaderModule { }
