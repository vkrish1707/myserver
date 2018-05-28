import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { IUser, UserSessionService } from '../../services/usersession.service';
import { Router } from '@angular/router';
import { AppRegisterService } from '../../services/app-register.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';


@Component({
  selector: 'app-registeruserconfirm',
  templateUrl: './registeruserconfirm.component.html',
  styleUrls: ['./registeruserconfirm.component.css']
})

export class RegisteruserconfirmComponent implements OnInit {

  @Output() oncontinue: EventEmitter<any> = new EventEmitter;
  @Output() oncancel: EventEmitter<any> = new EventEmitter;

  constructor(private router: Router,
              private registerService: AppRegisterService,
              private session: UserSessionService,
              public dialog: MatDialog) {}

  ngOnInit() {
  }

  onContinue() {
    this.oncontinue.emit(null);
  }
  onCancel() {
    this.oncancel.emit(null);
    console.log('cancel from user-confirm');
    
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(CanceldialogboxComponent, {
      width: '250px'
    });
  }
}

@Component({
  selector: 'app-canceldialogbox',
  templateUrl: 'canceldialogbox.html',
})

export class CanceldialogboxComponent {

  @Output() oncancel: EventEmitter<any> = new EventEmitter;

  constructor(
    public dialogRef: MatDialogRef<CanceldialogboxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onCancel() {
    this.oncancel.emit(null);
    console.log('cancel from dialog');
  }
}
