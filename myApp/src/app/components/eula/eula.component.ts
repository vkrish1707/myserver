import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-eula',
  templateUrl: './eula.component.html',
  styleUrls: ['./eula.component.css']
})

export class EulaComponent implements OnInit {

  @Output() onaccept: EventEmitter<any> = new EventEmitter();

  buttonStatus = true;

  constructor(private router: Router, public dialog: MatDialog) { }

  ngOnInit() {
  }

  onAccept() {
    this.onaccept.emit(null);
  }

  enableAccept() {
    this.buttonStatus = ((this.buttonStatus === true) ? false : true);
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(DeclinedialogboxComponent, {
      width: '250px'
    });
  }

}

@Component({
  selector: 'app-declinedialogbox',
  templateUrl: 'declinedialogbox.html',
})
export class DeclinedialogboxComponent {

  @Output() oncancel: EventEmitter<any> = new EventEmitter();

  constructor(
    public dialogRef: MatDialogRef<DeclinedialogboxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onDecline() {
    this.oncancel.emit(null);
  }
}
