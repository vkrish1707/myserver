import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogboxResult } from './globals';

@Component({
  selector: 'lib-dialogbox',
  templateUrl: './dialogbox.component.html',
  styleUrls: ['./dialogbox.component.css']
})

export class DialogBoxComponent {

  private title: string = '';
  private message: string = '';
  private showYes: boolean = false;
  private showNo: boolean = false;
  private showCancel: boolean = false;
  private showOk: boolean = false;
  private showClose: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>, @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.showYes = this.data.yes;
    this.showNo = this.data.no;
    this.showOk = this.data.ok;
    this.showCancel = this.data.cancel;
    this.showClose = this.data.close;
    this.title = this.data.title;
    this.message = this.data.message;
  }

  onClick(text: string): void {
    if (text == 'Yes') {
      this.dialogRef.close(DialogboxResult.Yes);
    } else if (text == 'Nes') {
      this.dialogRef.close(DialogboxResult.No);
    } else if (text == 'Ok') {
      this.dialogRef.close(DialogboxResult.Ok);
    } else if (text == 'Cancel') {
      this.dialogRef.close(DialogboxResult.Cancel);
    } else {
      this.dialogRef.close(DialogboxResult.Close);
    }
  }
}
