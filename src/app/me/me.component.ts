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
  personalBookingsSub: Subscription | null;
  mybookings: any[] |null;
  columnsToDisplay = ['date', 'time', 'delete'];

  constructor(
    private book: BookingService,
    public cache: CacheService
  ) {
    this.personalBookingsSub = null;
    this.mybookings = null;
  }

  ngOnInit(): void {
    this.getBookings();
    console.log(this.mybookings);
  }

  dateMonthAgo(): Date {
    let date = new Date();
    date.setDate(date.getDate() - 30);
    return date;
  }

  getBookings(): void {
    this.mybookings = [];
    this.personalBookingsSub = this.book
      .getPersonalBookings()
      .subscribe((bookings: any) => {
        this.mybookings = bookings;
        this.cache.saveBookings(bookings);
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
    this.personalBookingsSub!.unsubscribe();
  }
}
