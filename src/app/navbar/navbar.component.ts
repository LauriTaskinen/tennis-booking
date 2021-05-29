import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

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
      path: 'booking#me',
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

  logOutMethod() {
    this.auth.logOut();
  }
  constructor(public router: Router, public auth: AuthService) {}

  ngOnInit(): void {}
}
