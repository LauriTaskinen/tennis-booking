import { Injectable } from '@angular/core';
import { Slot } from './slot';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs/';

@Injectable({
  providedIn: 'root',
})
export class BookingslotsService {
  bSlotsCollection: AngularFirestoreCollection<Slot> | undefined;
  slots: Observable<any[]> | undefined;

  constructor(public afs: AngularFirestore) {}

  createBookingSlots(info: object) {
    return (
      this.afs
        .collection('bookingSlots')
        .add(info)
        //errorin näyttö näytöllä lisättävä
        .catch((error) => console.log(error))
    );
  }

  // haetaan bookingSlots collectionista slotit.
  // Pitää vielä muuttaa niin että hakee vain valitun päivän slotit
  // metodi valueChanges() mahdollistaa reaktiivisen tiedon käsittelyn.
  // valueChanges() palauttaa observablen, joka tilataan booking-componentissa.
  getBookingSlots() {
    this.slots = this.afs.collection('bookingSlots').valueChanges();
    return this.slots;
  }

  /*
  createBookingSlots(slots: object) {
    

    return (
      this.book
        .collection('bookingSlots')
        .add(slots)
        //errorin näyttö näytöllä lisättävä
        .catch((error) => console.log(error))
    );
  }
  */
}
