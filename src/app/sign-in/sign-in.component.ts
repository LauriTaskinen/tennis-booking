import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  constructor( public auth: AuthService) {}
  name = '';
  email = '';
  password = '';
  ngOnInit(): void {}

  onSubmit(data: NgForm) {
    this.auth.signUp(
      data.value.nimi,
      data.value.sahkoposti,
      data.value.salasana
    )
    data.resetForm();
  }
}
