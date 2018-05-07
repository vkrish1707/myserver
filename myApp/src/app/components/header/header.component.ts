import { Component, OnInit, Input } from '@angular/core';;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  @Input() menu: string = "show";
  @Input() help: string = "show";
  @Input() loginRegister: string = "show";
  @Input() profile: string = "show";

  private showMenu: boolean = false;
  private showHelp: boolean = false;
  private showLoginRegister: boolean = false;
  private showProfile: boolean = false;

  showMenuContent: boolean;
  menuicon: boolean;
  closeicon: boolean;

  constructor() {
    this.showMenuContent = false;
    this.menuicon = true;
    this.closeicon = false;
  }

  ngOnInit() {
    if (this.menu == "show") {
      this.showMenu = true;
    }
    if (this.help == "show") {
      this.showHelp = true;
    }
    if (this.loginRegister == "show") {
      this.showLoginRegister = true;
    }
    if (this.profile == "show") {
      this.showProfile = true;
    }
  }

  getShowMenuContent() {
    this.showMenuContent = ((this.showMenuContent == true) ? false : true);
    this.menuicon = ((this.menuicon == true) ? false : true);
    this.closeicon = ((this.closeicon == true) ? false : true);
  }
}
