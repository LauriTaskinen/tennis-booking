import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})
export class BookingComponent implements OnInit {
  startDate = new Date(2021, 5, 1);

  constructor() {}
  ngOnInit(): void {}
}
