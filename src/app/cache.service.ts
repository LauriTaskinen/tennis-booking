import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  constructor(private auth: AuthService) {}

  save(): void {
    let currentUser = this.auth.user;
    localStorage.setItem('currentUser', currentUser);
    console.log('userdata set in cache');
  }

  getItem(): string | void {
    let item = localStorage.getItem('currentUser');
    if (item !== null) {
      JSON.parse(item);
      return item;
    } else {
      console.log('nothing in cache');
    }
  }

  remove(): void {
    //varmistus, että käyttäjätiedot varmasti poistuvat, koska removeItemissa mahdollisesti bugi, joissain selaimien versioissa.
    localStorage.setItem('currentUser', '');
    localStorage.removeItem('currentUser');
    console.log('removed userdata from cache');
  }
}
