import { Component, OnInit } from '@angular/core';
import { BookingService } from '../booking.service';
import { AuthService } from '../auth.service';
import { Subject } from 'rxjs';

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

  constructor(private book: BookingService, public auth: AuthService) {
    this.currentUserID = this.auth.user.id;
    this.currentDate = new Date().toLocaleDateString();
    this.currentUserName = this.auth.user.name!;
  }

  ngOnInit(): void {
    this.getDataFromS();
  }

  getDataFromS() {
    this.book.getPersonalBookings().subscribe((bookings) => {
      this.mybookings = bookings;
    });
  }

  cancel(id: string) {
    console.log(id);
    this.book.cancelBooking(id);
  }

  //let mydata = this.book.getPersonalBookings().get();
  // console.log(mydata.subscribe());
}
