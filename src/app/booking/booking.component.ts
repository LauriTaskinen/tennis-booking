import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { BookingService } from '../booking.service';
import { CacheService } from '../cache.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})
export class BookingComponent implements OnInit, OnDestroy {
  allBookingsSub: Subscription | null;
  minDate: Date = new Date();
  touchUi = true;
  dayChosen = false; // tämä vaikuttaa vain siihen tuleeko kellonaikojen valinta näkyviin HTML-templaatissa
  timeChosen = '';
  dateChosen: Date; //valitsee päivän
  booked = 'Varattu';
  fullyBookedDates = [];
  maxBookingLimit = false;

  slots = ['08-10', '10-12', '12-14', '14-16', '16-18', '18-20'];

  timeSlot: Array<object>;

  constructor(
    private book: BookingService,
    private auth: AuthService,
    private cache: CacheService
  ) {
    this.allBookingsSub = null;

    // kalenterista valittu päivä muuttujassa
    this.dateChosen = new Date();

    this.timeSlot = [];
  }

  dateChanged($event: { target: { value: Date } }): void {
    this.dateChosen = $event.target.value;
    this.dayChosen = true;
    this.getTimeSlots(
      this.dateChosen.toLocaleDateString('en-US')
    );
  }
  // tässä parametrinä kellonaika, eli slot on esim 12-14 (this.slot3). Määritetty html templaatissa
  pickTime(slot: string): void {
    // muuttuja timeChosen saa nyt arvokseen slotin arvon eli vaikka 12-14
    this.timeChosen = slot;
  }

  // dateBooked(): boolean {
  // this.book.getPersonalBookings().subscribe((bookings) => {
  //   console.log(bookings);
  // bookings.forEach((booking: any) => {
  //   if (this.dateChosen === booking.payload.doc.data()) {
  //     return true;
  //   } else {
  //     return true;
  //   //   }
  // });
  // });
  // }

  // tämä metodi laukaisee kaksi metodia

  // 1) booking.servicessä createBooking-metodin
  // ja lisää tietokantaan dokumenttin joka sisältää objektina nimen, säköpostiosoitteen,
  // päivämäärän ja valitun ajan.

  // 2) bookingslots.servicessä updateSlots-metodin joka lisää funktion parametreiksi
  // valitun päivän (tulee dokumentin nimeksi), sekä valitun kellonajan joka menee
  // dokumentin sisään avaimen arvoksi.

  confirmBooking() {
    let date = this.dateChosen.toLocaleDateString('en-US').split('.');
    this.book
      .createBooking({
        id: this.cache.getItem('currentUserID'),
        date: date.toString(),
        time: this.timeChosen,
      })
      .catch((error) => console.log(error));
    //jos error niin 'oops'-dialog!

    // this.timeSlots.updateSlots(this.dateChosen.toString(), this.timeSlot);
    console.log('booked!');
    window.scroll(0, 0);
  }

  //hakee kaikki varaukset ja asettaa timeslot-muuttujaan ne, jotka koskevat parametriä annettua päivää.
  getTimeSlots(date: any) {
    this.allBookingsSub = this.book
      .getAllBookings()
      .subscribe((bookings: any) => {
        this.timeSlot = [];
        this.maxBookingLimit = false;
        this.scrollTo('choose-time')
        for (const booking of bookings) {
          if (booking.payload.doc.data().date === date) {
            this.timeSlot.push({
              time: booking.payload.doc.data().time,
              date: booking.payload.doc.data().date,
            });
            if (
              booking.payload.doc.data().id === this.auth.user?.id ||
              this.cache.currentUserID
            ) {
              this.maxBookingLimit = true;
              this.scrollTo('max-limit-reached')
            }
          }

          // this.fullyBookedDates
        }

        return this.timeSlot;
      });
  }

  slotUnavailable(slot: string): boolean {
    return this.timeSlot.some((s: any) => s.time === slot);
  }

  scrollTo(elem: string){
    const element = document.getElementById(elem)
    element?.scrollIntoView();
  }

  ngOnInit(): void {
    console.log(this.dateChosen);

    // this.dateBooked();
  }
  ngOnDestroy(): void {
    this.allBookingsSub?.unsubscribe();
  }
}
