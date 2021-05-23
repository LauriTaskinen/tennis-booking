import { Component, OnInit } from '@angular/core';
import { BookingService } from '../booking.service';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.css'],
})
export class MeComponent implements OnInit {
  mybookings: any;

  constructor(private book: BookingService) {}

  ngOnInit(): void {
    this.getDataFromS();
  }

  getDataFromS = () =>
    this.book.getPersonalBookings().subscribe((res) => (this.mybookings = res));

  //let mydata = this.book.getPersonalBookings().get();
  // console.log(mydata.subscribe());
}
