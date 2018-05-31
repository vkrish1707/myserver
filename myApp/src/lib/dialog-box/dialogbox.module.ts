import { NgModule, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import core = require('./dialogbox')

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class DialogboxModule { }

export class AppModule {

  constructor(private injector: Injector) {
    core.InjectorInstance = injector;
  }
}
