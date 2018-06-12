import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule,
         MatCheckboxModule,
         MatProgressSpinnerModule,
         MatDialogModule,
         MatDividerModule } from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatDividerModule
  ],

  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatDividerModule
  ]

})

export class MaterialModule { }
