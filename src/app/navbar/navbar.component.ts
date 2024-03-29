import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { LocalstorageService } from '../localstorage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  navItems = [
    {
      label: 'Varaa kenttä',
      icon: 'calendar_today',
      path: 'booking#booking',
      mobileView: false,
      tabletView: true,
      desktopView: true,
    },
    {
      label: 'Omat varaukseni',
      icon: 'perm_identity',
      path: 'booking',
      mobileView: false,
      tabletView: false,
      desktopView: true,
    },
    {
      label: 'Admin',
      icon: 'leaderboard',
      path: 'admin',
      mobileView: false,
      tabletView: false,
      desktopView: true,
    },
  ];

  logOutItem = {
    label: 'Kirjaudu ulos',
    icon: 'logout',
    path: 'login',
    mobileView: true,
    tabletView: true,
    desktopView: true,
  };

  constructor(
    public router: Router,
    public auth: AuthService,
    public localstorage: LocalstorageService
  ) {
    /* joissain tilanteissa auth.user.name ei ole käytettävissä välittömästi tai lainkaan (esim. sivun päivitys)
    ja siinä tapauksessa haemme tiedon localstoragesta. */
  }

  logOutMethod() {
    this.auth.logOut();
  }
  ngOnInit(): void {}
}
