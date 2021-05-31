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
  currentName: string | void;

  constructor(
    public book: BookingService,
    private cache: CacheService,
    private auth: AuthService
  ) {
    this.personalBookingsSub = null;
    this.mybookings =null;
    this.currentName = this.auth.user?.name ? this.auth.user!.name : this.cache.currentUserName;
  }

  ngOnInit(): void {
    this.getBookings();
  }

  dateMonthAgo(): Date {
    let date = new Date();
    date.setDate(date.getDate() - 30);
    return date;
  }

  getBookings(): void {
    this.personalBookingsSub = this.book
      .getPersonalBookings()
      .subscribe((bookings: any) => {
        this.mybookings = bookings;
      });
  }

  cancelBooking(id: string) {
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
