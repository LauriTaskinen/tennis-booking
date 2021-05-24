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
    /*{
      label: 'Kirjaudu ulos',
      icon: 'arrow_back',
      path: 'login',
      mobileView: true,
      tabletView: true,
      desktopView: true,
      //tämä aiheuttaa uloskirjautumisen aina uudelleenladattaessa
      //muutettava uloskirjautuminen erilleen ngforista
      logOut: this.auth.logOut(),
    },*/
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
      tabletView: true,
      desktopView: true,
    },
  ];

  logOutItem = {
    label: 'Kirjaudu ulos',
    icon: 'arrow_back',
    path: 'login',
    mobileView: true,
    tabletView: true,
    desktopView: true,
    //tämä aiheuttaa uloskirjautumisen aina uudelleenladattaessa
    //muutettava uloskirjautuminen erilleen ngforista
  };

  logOutMethod() {
    this.auth.logOut();
  }
  constructor(public router: Router, public auth: AuthService) {}

  ngOnInit(): void {}
}
