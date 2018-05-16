import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatProgressSpinnerModule
} from '@angular/material';


@NgModule({
  imports: [
      MatButtonModule,
      MatCheckboxModule,
      MatProgressSpinnerModule
    ],
  exports: [
      MatButtonModule,
      MatCheckboxModule,
      MatProgressSpinnerModule

    ],
})
export class MaterialModule { }
