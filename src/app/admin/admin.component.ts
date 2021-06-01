import { Component, OnDestroy, OnInit } from '@angular/core';
import { BookingService } from '../booking.service';
import { Subscription } from 'rxjs';
import { BookingData } from '../bookingdata';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit, OnDestroy {
  usersSub: Subscription | null;
  bookingsSub: Subscription | null;
  allbookings: BookingData[];
  allUsers: any[] | null;
  data: any;
  columnsToDisplay = ['name', 'date', 'time'];
  sortedData: BookingData[];
  permissionsError: any;
  date: any;

  constructor(public book: BookingService) {
    this.allUsers = this.getAllUsers(); //noudetaan jo alustuksessa käyttäjät
    this.allbookings = this.getAllData(this.allUsers); // ja niihin liittyvät varaukset
    this.usersSub = null; //nämä vain unsubscribeä varten
    this.bookingsSub = null;
    this.sortedData = this.allbookings; //tässä on aluksi suodattamatonta dataa
    this.permissionsError = null;
    this.date;
  }

  ngOnInit() {
    this.deleteOldBookings();
  }

  //Sorting toteutettu angular material sorting-esimerkin mukaisesti myös logiikan osalta.
  sortData(sort: Sort) {
    const data = this.allbookings.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }
    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name':
          return compare(a.name, b.name, isAsc);
        case 'date':
          return compare(a.date, b.date, isAsc);
        case 'time':
          return compare(a.time, b.time, isAsc);
        default:
          return 0;
      }
    });
  }

  /* getAllUsers hakee taulukkoon kaikki käyttäjät users-collectionista.
  Sallittu vain jos on kirjautunut admin-käyttäjällä*/
  getAllUsers() {
    let allUsers: any[] = [];
    this.usersSub = this.book.getUsers().subscribe((users) => {
      users.forEach((user) => {
        allUsers.push(user.payload.doc.data());
      });
    });
    return allUsers;
  }

  /*cancelBooking peruuttaa varauksen id:n perusteella. 
    Metodi kutsuu bookingservicen metodia.*/
  cancelBooking(id: string) {
    this.book.deleteBooking(id);
  }

  /* getAllData hakee admin-näkymään kaikki varaukset käytttäjineen.
    Metodi noutaa ensin kaikki varaukset ja sitten vertaa niitä parametrina
  saatuun users-taulukkoon löytääkseen varaukselle varaajan tiedot. Metodi 
  palauttaa taulukon yhdistetyillä tiedoilla */
  getAllData(users: any[]) {
    let allbookings: any[] = [];
    this.bookingsSub = this.book.getAllBookings().subscribe((bookings: any) => {
      bookings.forEach((booking: any) => {
        let match = users.find(
          (user) => user.id === booking.payload.doc.data().id
        );
        if (!match) {
          this.permissionsError = true;
        } else {
          this.permissionsError = false;
          allbookings.push({
            name: match.name,
            email: match.email,
            id: booking.payload.doc.data().id,
            time: booking.payload.doc.data().time,
            date: booking.payload.doc.data().date,
          });
        }
      });
    });
    return allbookings;
  }

  /*poistaa vanhentuneet postaukset aina kun uusia aiotaan luoda,
    Näin tietokanta ei pääse koskaan paisumaan*/
  deleteOldBookings() {
    this.book.deleteOldBookings(this.book.dateMonthAgo());
  }

  //let mydata = this.book.getPersonalBookings().get();
  // console.log(mydata.subscribe());

  ngOnDestroy() {
    this.usersSub!.unsubscribe();
    this.bookingsSub!.unsubscribe();
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
