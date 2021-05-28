import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  constructor() {}

  save(user: any): void {
    let currentUser = user;
    localStorage.setItem('currentUserID', currentUser!.id);
    localStorage.setItem('currentUserName', currentUser!.name);
    localStorage.setItem('currentUserEmail', currentUser!.email);
    console.log('userdata set in cache');
  }

  getItem(userdata: string): string | void {
    let item = localStorage.getItem(userdata);
    if (item !== null) {
      console.log(item);
      return item;
    } else {
      console.log('nothing in cache');
    }
  }

  remove(): void {
    //varmistus, että käyttäjätiedot varmasti poistuvat, koska removeItemissa mahdollisesti bugi, joissain selaimien versioissa.
    localStorage.setItem('currentUser', '');
    localStorage.clear();
    localStorage.removeItem('currentUser');
    console.log('removed userdata from cache');
  }
}
