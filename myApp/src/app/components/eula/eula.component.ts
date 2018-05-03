import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-eula',
  templateUrl: './eula.component.html',
  styleUrls: ['./eula.component.css']
})
export class EulaComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onAccept() {
    this.router.navigate(['/progress']);
  }

  onDecline() {
    this.router.navigate(['/register']);
  }
}
