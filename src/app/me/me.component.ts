import { Component, OnInit } from '@angular/core';
import { BookingService } from '../booking.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.css'],
})
export class MeComponent implements OnInit {
  mybookings: any;
  //nämä vaihdettava uid:hen (myös tallennettava uid syöttövaiheessa)
  currentUserID: string;
  currentUserName: string;
  currentDate: string;

  columnsToDisplay = ['date', 'time', 'delete'];

  constructor(private book: BookingService, public auth: AuthService) {
    this.currentUserID = this.auth.user.id;
    this.currentDate = book.formatBookingDate(new Date());
    this.currentUserName = this.auth.user.name!;
  }

  ngOnInit(): void {
    this.getDataFromS();
  }

  dateMonthAgo() {
    let date = new Date();
    date.setDate(date.getDate() - 30);
    return date;
  }

  getDataFromS() {
    this.book.getPersonalBookings().subscribe((bookings) => {
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
}
