import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { BookingService } from '../booking.service';
import { BookingslotsService } from '../bookingslots.service';

import { Slot } from '../slot';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})
export class BookingComponent implements OnInit {
  minDate: Date = new Date();
  touchUi = true;
  dayChosen = false; // tämä vaikuttaa vain siihen tuleeko kellonaikojen valinta näkyviin HTML-templaatissa

  timeChosen = '';
  dateChosen: Date; //valitsee päivän
  booked = 'Varattu';
  slot1: string;
  slot2: string;
  slot3: string;
  slot4: string;
  slot5: string;
  slot6: string;

  slots: any[] | undefined;

  slot: {};

  constructor(
    private book: BookingService,
    private auth: AuthService,
    private timeSlots: BookingslotsService
  ) {
    //muuttujia joiden arvoja ovat kellonajat
    this.slot1 = '08-10';
    this.slot2 = '10-12';
    this.slot3 = '12-14';
    this.slot4 = '14-16';
    this.slot5 = '16-18';
    this.slot6 = '18-20';

    // kalenterista valittu päivä muuttujassa
    this.dateChosen = new Date();

    this.slot = {
      time: this.timeChosen,
    };
  }

  dateChanged($event: { target: { value: Date } }): void {
    //console.log($event);
    this.dateChosen = $event.target.value;
    this.dayChosen = true;
    //myBookings.push($event.target.value);
  }
  // tässä parametrinä kellonaika, eli slot on esim 12-14 (this.slot3). Määritetty html templaatissa
  pickTime(slot: string): void {
    // muuttuja timeChosen saa nyt arvokseen slotin arvon eli vaikka 12-14
    this.timeChosen = slot;
    console.log(slot);
  }
  // tämä metodi laukaisee kaksi metodia

  // 1) booking.servicessä createBooking-metodin
  // ja lisää tietokantaan dokumenttin joka sisältää objektina nimen, säköpostiosoitteen,
  // päivämäärän ja valitun ajan.

  // 2) bookingslots.servicessä updateSlots-metodin joka lisää funktion parametreiksi
  // valitun päivän (tulee dokumentin nimeksi), sekä valitun kellonajan joka menee
  // dokumentin sisään avaimen arvoksi.

  confirmBooking() {
    this.book.createBooking({
      id: this.auth.user.id,
      name: this.auth.user.name,
      email: this.auth.user.email,
      date: this.dateChosen.toLocaleDateString(),
      time: this.timeChosen,
    });
    this.timeSlots.updateSlots(this.dateChosen.toString(), this.slot);
    console.log('booked!');
    //"lomakkeen" nollaus
  }

  //tähän updateSlots, jossa valittu slotti muutetaan trueksi.
  //eli otetaan valittu (timeChosen = 8-10) ja sanotaan, että päivitä
  //sen niminen kenttä dokumentista trueksi.
  //updateSlots(timechosen){
  //
  //}
  //tähän tieto sloteista mitkä luodaan

  /*poistaa vanhentuneet postaukset aina kun uusia aiotaan luoda,
    Näin tietokanta ei pääse koskaan paisumaan*/
  deleteOldBookings() {}

  // tilataan tieto vapaista sloteista observablena servicestä
  ngOnInit(): void {
    this.timeSlots.getBookingSlots().subscribe((slots) => {
      console.log(slots);
      this.slots = slots;
    });
    this.deleteOldBookings();
  }
}
