import { NgModule, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';

import core = require('./globals');
import { DialogBoxComponent } from './dialogbox.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DialogBoxComponent
  ],
  entryComponents: [
    DialogBoxComponent
  ]
})

export class DialogboxModule {

  constructor(private injector: Injector) {
    core.InjectorInstance = injector;
  }
}
