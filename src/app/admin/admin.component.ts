import { Component, OnDestroy, OnInit } from '@angular/core';
import { BookingService } from '../booking.service';
import { AuthService } from '../auth.service';
import { Subject, Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
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
  currentUserID: string;
  currentUserName: string;
  currentDate: string;
  data: any;
  columnsToDisplay = ['name', 'date', 'time'];
  sortedData: BookingData[];
  permissionsError: any;

  // private auth: AuthService
  constructor(public book: BookingService, private auth: AuthService) {
    this.currentUserID = this.auth.userState ? this.auth.user!.id : '';
    this.currentDate = book.currentDate;
    this.currentUserName = this.auth.userState ? this.auth.user!.name! : '';
    this.allUsers = this.getAllUsers();
    this.allbookings = this.getAllData(this.allUsers);
    this.usersSub = null;
    this.bookingsSub = null;
    this.data = new MatTableDataSource<any>(this.allbookings);
    this.sortedData = this.allbookings;
    this.permissionsError = null;
  }

  ngOnInit() {
    // let dataSamples: ItemModel[] ;
    //init your list with ItemModel Objects (can be manual or come from server etc) And put it in data source
  }
  //Sorting toteutettu angular material -esimerkin mukaisesti.
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
        default:
          return 0;
      }
    });
    console.log(data);
  }

  dateMonthAgo(): Date {
    let date = new Date();
    date.setDate(date.getDate() - 30);
    return date;
  }

  getAllUsers() {
    let allUsers: any[] = [];
    this.usersSub = this.book.getUsers().subscribe((users) => {
      users.forEach((user) => {
        allUsers.push(user.payload.doc.data());
      });
    });
    return allUsers;
  }

  cancelBooking(id: string) {
    console.log(id);
    this.book.deleteBooking(id);
  }

  getAllData(users: any[]) {
    let allbookings: any[] = [];
    this.usersSub = this.book.getAllBookings().subscribe((bookings: any) => {
      bookings.forEach(async (booking: any) => {
        let match = await users.find(
          (user) => user.id === booking.payload.doc.data().id
        );
        if (!match) {
          this.permissionsError = true;
        } else {
          this.permissionsError = false;
          allbookings.push({
            name: match.name,
            email: match.email,
            // phone: match.phone,
            id: booking.payload.doc.data().id,
            time: booking.payload.doc.data().time,
            date: booking.payload.doc.data().date,
          });
        }
      });
    });

    console.log(allbookings);
    return allbookings;
  }

  /*poistaa vanhentuneet postaukset aina kun uusia aiotaan luoda,
    Näin tietokanta ei pääse koskaan paisumaan*/
  //deleteOldBookings() {
  // this.book.getOldBookings(this.dateMonthAgo());

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
