import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  constructor(
    private router: Router,
    public auth: AuthService,

  ) {}

  ngOnInit(): void {}

  onSubmit(data: NgForm) {
    this.auth.signUp(
      data.value.nimi,
      data.value.sahkoposti,
      data.value.salasana
    );

    data.resetForm();
    this.router.navigate(['login']);
    //tämän jälkeen snackbar-viesti, että nyt voit kirjautua
  }
}
