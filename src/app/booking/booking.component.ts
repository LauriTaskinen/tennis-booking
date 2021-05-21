import { TransitiveCompileNgModuleMetadata } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})
export class BookingComponent implements OnInit {
  minDate: Date = new Date();
  touchUi = true;
  dayChosen = false;
  timeChosen = '';
  pickedTime: Date;
  booked = 'Varattu';
  slot1: string;
  slot2: string;
  slot3: string;
  slot4: string;
  slot5: string;
  slot6: string;

  constructor() {
    this.slot1 = '08-10';
    this.slot2 = '10-12';
    this.slot3 = '12-14';
    this.slot4 = '14-16';
    this.slot5 = '16-18';
    this.slot6 = '18-20';
    this.pickedTime = new Date();
  }

  dateChanged($event: { target: { value: any } }) {
    //console.log($event);
    this.pickedTime = $event.target.value;
    return (this.dayChosen = true);
    //myBookings.push($event.target.value);
  }

  pickTime(slot: string) {
    this.timeChosen = slot;
    console.log(slot);
    return this.booked;
  }

  ngOnInit(): void {}
}
