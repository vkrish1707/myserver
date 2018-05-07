import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-eula',
  templateUrl: './eula.component.html',
  styleUrls: ['./eula.component.css']
})

export class EulaComponent implements OnInit {

  @Output() onaccept: EventEmitter<any> = new EventEmitter();
  @Output() oncancel: EventEmitter<any> = new EventEmitter();

  buttonStatus = true;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onAccept() {
    this.onaccept.emit(null);
  }

  onDecline() {
    this.oncancel.emit(null);
  }

  enableAccept() {
    this.buttonStatus = ((this.buttonStatus === true) ? false : true);
  }
}

