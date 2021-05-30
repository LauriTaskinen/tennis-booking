/* Välimuistia käytetään mm. angular/firebase refresh -ongelman kiertämiseksi. 
  Ongelma syntyy päivittäessä sivua, jolloin auth-tila nollaantuu. Näin ei pitäisi 
  käydä firebasen ohjeistuksien mukaan. 

  Tuomalla käyttäjän tiedot välimuistiin mahdollistetaan kirjautumistilan pysyvyys, 
  kunnes käyttäjä painaa kirjaudu ulos painiketta, myös silloin kun selain suljetaan.
  Muiden tallennettujen tietojen avulla voidaan paikata kohtia, joissa normaalisti 
  käytettäisiin firebasen authorisaatiosta saatavia tietoja. 
  tarvitaan. */

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  currentUserID: string | void;
  currentUserName: string | void;

  constructor() {
    /*näitä kahta tarvitaan muissa komponenteissa usein,
      joten tämä yksinkertaistaa hieman niiden hakemista*/
    this.currentUserID = this.getItem('currentUserID');
    this.currentUserName = this.getItem('currentUserName');
  }

  saveUser(user: any): void {
    let currentUser = user;
    localStorage.setItem('currentUserID', currentUser!.id);
    localStorage.setItem('currentUserName', currentUser!.name);
    localStorage.setItem('currentUserEmail', currentUser!.email);
    console.log('userdata set in cache');
  }

  getItem(userdata: string): string | undefined {
    let item = localStorage.getItem(userdata);
    if (item !== null) {
      console.log(item);
      return item;
    } else {
      return undefined;
    }
  }

  remove(): void {
    localStorage.clear();
    console.log('removed userdata from cache');
  }
}
