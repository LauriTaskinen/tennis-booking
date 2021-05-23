import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { BookingService } from '../booking.service';

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

  constructor(private book: BookingService, private auth: AuthService) {
    this.slot1 = '08-10';
    this.slot2 = '10-12';
    this.slot3 = '12-14';
    this.slot4 = '14-16';
    this.slot5 = '16-18';
    this.slot6 = '18-20';
    this.pickedTime = new Date();
  }

  dateChanged($event: { target: { value: any } }): void {
    //console.log($event);
    this.pickedTime = $event.target.value;
    this.dayChosen = true;
    //myBookings.push($event.target.value);
  }

  pickTime(slot: string): void {
    this.timeChosen = slot;
    console.log(slot);
  }

  confirmBooking() {
    this.book.createBooking({
      name: this.auth.user.displayName,
      email: this.auth.user.email,
      date: this.pickedTime.toLocaleDateString(),
      time: this.timeChosen,
    });
    console.log('booked!');
    //"lomakkeen" nollaus
  }

  /*poistaa vanhentuneet postaukset aina kun uusia aiotaan luoda,
    Näin tietokanta ei pääse koskaan paisumaan*/
  deleteOldBookings() {}

  ngOnInit(): void {
    this.deleteOldBookings();
  }
}
