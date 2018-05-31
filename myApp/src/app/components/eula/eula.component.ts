import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { showDialog, DialogBoxButtons } from '../../../lib/dialogbox/dialogbox';
import { AppRegisterService } from '../../services/app-register.service';

@Component({
  selector: 'app-eula',
  templateUrl: './eula.component.html',
  styleUrls: ['./eula.component.css']
})

export class EulaComponent implements OnInit {

  @Output() onaccept: EventEmitter<any> = new EventEmitter();
  @Output() oncancel: EventEmitter<any> = new EventEmitter();

  buttonStatus = true;
  public dialogResult;

  constructor(private router: Router, private registerService: AppRegisterService) { }

  ngOnInit() {
  }

  onAccept() {
    this.onaccept.emit(null);
  }

  enableAccept() {
    this.buttonStatus = ((this.buttonStatus === true) ? false : true);
  }

  async dialogBox() {
    console.log('dialogBox');    
    this.dialogResult = await showDialog('Decline Confirmation', 'Are you sure?', DialogBoxButtons.YesNo);
    if (this.dialogResult == 0) {
      console.log('inside if');
      
      this.registerService.data.logout();
      this.router.navigate(['/home']);
    }
  }
}
