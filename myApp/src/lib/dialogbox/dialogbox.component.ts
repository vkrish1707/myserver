import { Component, EventEmitter, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogBoxResult } from './globals';


@Component({
  selector: 'app-dialogbox',
  templateUrl: './dialogbox.component.html',
  styleUrls: ['./dialogbox.component.css']
})

export class DialogBoxComponent {

  private showYes: boolean = false;
  private showNo: boolean = false;
  private showCancel: boolean = false;
  private showOk: boolean = false;
  private showClose: boolean = false;
  private title: string = '';
  private message: string = '';
  private color: string = '';

  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
      this.showYes = this.data.yes;
      this.showNo = this.data.no;
      this.showOk = this.data.ok;
      this.showCancel = this.data.cancel;
      this.showClose = this.data.close;
      this.title = this.data.title;
      this.message = this.data.message;
      this.color = this.data.color;
    }

  onClick(text: string): void {
    if (text == 'Yes') {
      this.dialogRef.close(DialogBoxResult.Yes);
      this.color = 'warn';
    } else if (text == 'No') {
      this.dialogRef.close(DialogBoxResult.No);
    } else if (text == 'Ok') {
      this.dialogRef.close(DialogBoxResult.Ok);
    } else if (text == 'Cancel') {
      this.dialogRef.close(DialogBoxResult.Cancel);
    } else {
      this.dialogRef.close(DialogBoxResult.Close);
    }
  }
}
