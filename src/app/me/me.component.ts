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
  currentUserName: any;
  currentDate: string;

  constructor(private book: BookingService, public auth: AuthService) {
    this.currentUserName = this.auth.user.displayName;
    this.currentDate = new Date().toLocaleDateString();
  }

  ngOnInit(): void {
    this.getDataFromS();
  }

  getDataFromS = () =>
    this.book.getPersonalBookings().subscribe((res) => (this.mybookings = res));

  //let mydata = this.book.getPersonalBookings().get();
  // console.log(mydata.subscribe());
}
