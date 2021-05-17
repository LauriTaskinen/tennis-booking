import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})
export class BookingComponent implements OnInit {
  minDate: Date = new Date();
  touchUi = true;

  dateChanged($event: { target: { value: any } }) {
    console.log($event);
    //myBookings.push($event.target.value);
  }

  constructor() {}
  ngOnInit(): void {}
}

const myBookings = [];
