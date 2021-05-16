import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  navItems = [
    {
      label: 'Kirjaudu ulos',
      icon: 'arrow_back',
      path: 'login',
    },
    {
      label: 'Varaa Kenttä',
      icon: 'calendar_today',
      path: 'booking#booking',
    },
    {
      label: 'Omat varaukseni',
      icon: 'perm_identity',
      path: 'booking#me',
    },
  ];

  constructor(public router: Router) {}

  ngOnInit(): void {}
}

class MyComponent {}
