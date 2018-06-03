import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule,
         MatCheckboxModule,
         MatProgressSpinnerModule,
         MatDialogModule } from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatDialogModule
  ],

  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatDialogModule
  ]

})

export class MaterialModule { }
