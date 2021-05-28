import { Component, OnDestroy, OnInit } from '@angular/core';
import { BookingService } from '../booking.service';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import { CacheService } from '../cache.service';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.css'],
})
export class MeComponent implements OnInit, OnDestroy {
  personalBookingsSub: Subscription;
  mybookings: any;
  currentUserID: string | void;
  currentUserName: string;
  currentDate: string;
  columnsToDisplay = ['date', 'time', 'delete'];

  constructor(
    private book: BookingService,
    private auth: AuthService,
    private cache: CacheService
  ) {
    this.currentUserID = this.cache.getItem('currentUserID');
    this.currentDate = book.formatBookingDate(new Date());
    this.currentUserName = this.auth.user ? this.auth.user!.name! : '';
    this.personalBookingsSub = this.getBookings();
  }

  ngOnInit(): void {
    this.getBookings();
  }

  dateMonthAgo(): Date {
    let date = new Date();
    date.setDate(date.getDate() - 30);
    return date;
  }

  getBookings() {
    return this.book.getPersonalBookings().subscribe((bookings: any) => {
      this.mybookings = bookings;
    });
  }

  cancelBooking(id: string) {
    console.log(id);
    this.book.deleteBooking(id);
  }

  /*poistaa vanhentuneet postaukset aina kun uusia aiotaan luoda,
    Näin tietokanta ei pääse koskaan paisumaan*/
  deleteOldBookings() {
    // this.book.getOldBookings(this.dateMonthAgo());
  }

  //let mydata = this.book.getPersonalBookings().get();
  // console.log(mydata.subscribe());
  ngOnDestroy(): void {
    this.personalBookingsSub.unsubscribe();
  }
}
