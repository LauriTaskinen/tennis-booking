import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { BookingService } from '../booking.service';
import { LocalstorageService } from '../localstorage.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import User from '../user';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})
export class BookingComponent implements OnInit, OnDestroy {
  allBookingsSub: Subscription | null; //subscription unsubscribea varten
  minDate: Date = new Date(); // määrittää ettei nykyistä päivämäärää aikaisempia aikoja voi valita datepickerillä
  touchUi = true; //datepickerissä kosketuisnäytöille sopiva näkymä
  dayChosen = false; // tämä vaikuttaa vain siihen tuleeko kellonaikojen valinta näkyviin HTML-templaatissa
  timeChosen = '0'; // kertoo tämänhetkisen valitun slotin
  dateChosen: Date; //valitsee päivän
  fullyBookedDates = []; //kun päivä on varattu kokonaan se siirretään tänne
  maxBookingLimit = false; //käyttäjä saa tehdä vain yhden varauksen per päivä ja silloin tästä tulee true

  slots = ['08-10', '10-12', '12-14', '14-16', '16-18', '18-20']; // varattavissa olevat aikaslotit

  timeSlot: Array<object>; //valitun päivän jo varatut aikaslotit tulevat tänne

  constructor(
    private book: BookingService,
    private auth: AuthService,
    private localstorage: LocalstorageService,
    private snackbar: MatSnackBar
  ) {
    this.allBookingsSub = null;
    this.dateChosen = new Date();
    this.timeSlot = [];
  }

  /* dateChanged ottaa parametrikseen datepickerin eventin kautta saamansa arvon. 
    Arvo asetetaan dateChosen  muuttujaan 
  */
  dateChanged($event: { target: { value: Date } }): void {
    this.dateChosen = $event.target.value;
    this.dayChosen = true;
    this.getTimeSlots(this.dateChosen.toLocaleDateString('en-US'));
  }

  // pickTime parametrina kellonaika, eli slot on esim 12-14. Määritetty html-templaatissa.
  pickTime(timeSlot: string): void {
    this.scrollTo('confirm');
    this.timeChosen = timeSlot;
  }

  /* booking.service lähettää nyt käyttäjän tiedot omaan collectioniin ja kutsuu createBooking-metodia
   joka lähettää bookings-collectioniin dokumentin joka sisältää valitun päivämäärän ja valitun ajan.*/
  confirmBooking() {
    this.dayChosen = false;
    let date = this.dateChosen.toLocaleDateString('en-US');
    if (this.auth.user?.id !== null) {
      this.auth.updateUser(this.auth.user!.id, this.auth.user!);
    }
    this.book
      .createBooking({
        id: this.auth.user?.id,
        date: date.toString(),
        time: this.timeChosen,
      })
      .then(() => {
        window.scrollTo(0, -2);
      })
      .catch((error) => {
        console.log(error);
        this.snackbar.open(
          'Oops! Ei onnistunut. Kirjaudu uudelleen sisään ja yritä uudestaan',
          'OK',
          { duration: 4000, panelClass: ['error-message'] }
        );
      });
  }

  /*getTimeSlots hakee kaikki varaukset ja asettaa timeslot-muuttujaan ne, jotka koskevat parametrina annettua päivää ja
    tarkastaa onko käyttäjä tehnyt jo varauksen kyseiselle päivälle.*/
  getTimeSlots(date: any) {
    this.allBookingsSub = this.book
      .getAllBookings()
      .subscribe((bookings: any) => {
        this.timeSlot = [];
        this.maxBookingLimit = false;

        /*jos varausteidoissa esiintyy varauksia parametrina annetulla päivällä, ne asetetaan timeSlot-taulukkoon,
          joka säilyttää päivän varattuja aikoja eli slotteja*/
        for (const booking of bookings) {
          if (booking.payload.doc.data().date === date) {
            this.timeSlot.push({
              time: booking.payload.doc.data().time,
              date: booking.payload.doc.data().date,
            });
            if (
              booking.payload.doc.data().id === this.auth.user?.id ||
              booking.payload.doc.data().id === this.localstorage.currentUserID
            ) {
              this.maxBookingLimit = true;
            } else {
              // window.scrollTo(0,-2)
            }
          }
        }
        return this.timeSlot;
      });
  }

  /*slotUnavailable tarkistaa ovatko "slottien" ajat varattuja ja palauttaa totuusarvon, 
    jonka avulla varatut ajat näytetään näkymässä disabled nappeina*/
  slotUnavailable(slot: string): boolean {
    return this.timeSlot.some((s: any) => s.time === slot);
  }

  //scollaus parametrina annettuun elementtiin sivulla.
  scrollTo(elemID: string) {
    const element = document.getElementById(elemID);
    element?.scrollIntoView();
  }

  ngOnInit(): void {
    console.log(this.dateChosen);
  }

  //Varmuuden vuoksi subscibet peruutetaan komponentin poistuessa, jotta muistivuodoilta vältyttäisiin.
  ngOnDestroy(): void {
    this.allBookingsSub?.unsubscribe();
  }
}
