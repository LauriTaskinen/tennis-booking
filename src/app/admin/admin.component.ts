import { Component, OnDestroy, OnInit } from '@angular/core';
import { BookingService } from '../booking.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  allbookings: any;
  currentUserID: string;
  currentUserName: string;
  currentDate: string;
  columnsToDisplay = ['name', 'date', 'time', 'delete'];

  // private auth: AuthService
  constructor(private book: BookingService, private auth: AuthService) {
    this.currentUserID = this.auth.userState ? this.auth.user.id : '';
    this.currentDate = book.formatBookingDate(new Date());
    this.currentUserName = this.auth.userState ? this.auth.user.name! : '';
  }

  ngOnInit() {
    this.getAllBookings();
  }

  dateMonthAgo(): Date {
    let date = new Date();
    date.setDate(date.getDate() - 30);
    return date;
  }

  getAllBookings() {
    this.book
      .getPersonalBookings()
      .subscribe((res) => (this.allbookings = res));
  }

  cancelBooking(id: string) {
    console.log(id);
    this.book.deleteBooking(id);
  }

  /*poistaa vanhentuneet postaukset aina kun uusia aiotaan luoda,
    Näin tietokanta ei pääse koskaan paisumaan*/
  //deleteOldBookings() {
  // this.book.getOldBookings(this.dateMonthAgo());

  //let mydata = this.book.getPersonalBookings().get();
  // console.log(mydata.subscribe());
}
