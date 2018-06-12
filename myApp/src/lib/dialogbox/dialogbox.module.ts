import { NgModule, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';

import core = require('./globals');
// import { Core } from './globals';
import { DialogBoxComponent } from './dialogbox.component';
import { MaterialModule } from '../../app/modules/material.module';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule
    ],
    declarations: [
        DialogBoxComponent
    ],
    
    entryComponents:[
        DialogBoxComponent
    ]
})

export class DialogboxModule { 
    constructor(private injector: Injector) {
        core.InjectorInstance = injector;
      }
}