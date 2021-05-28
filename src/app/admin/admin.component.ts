import { Component, OnDestroy, OnInit } from '@angular/core';
import { BookingService } from '../booking.service';
import { AuthService } from '../auth.service';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit, OnDestroy {
  usersSub: Subscription | null;
  bookingsSub: Subscription | null;
  allbookings: any[] | null;
  allUsers: any[] | null;
  currentUserID: string;
  currentUserName: string;
  currentDate: string;
  columnsToDisplay = ['name', 'date', 'time', 'delete'];

  // private auth: AuthService
  constructor(private book: BookingService, private auth: AuthService) {
    this.currentUserID = this.auth.userState ? this.auth.user!.id : '';
    this.currentDate = book.formatBookingDate(new Date());
    this.currentUserName = this.auth.userState ? this.auth.user!.name! : '';
    this.allUsers = this.getAllUsers();
    this.allbookings = this.getAllData(this.allUsers);
    this.usersSub = null;
    this.bookingsSub = null;
  }

  ngOnInit() {
    console.log(this.allbookings);
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
        console.log(match);
        allbookings.push({
          name: match.name,
          email: match.email,
          phone: match.phone,
          id: booking.payload.doc.data().id,
          time: booking.payload.doc.data().time,
          date: booking.payload.doc.data().date,
        });
      });
    });
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
