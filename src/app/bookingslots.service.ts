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

  constructor(public store: AngularFirestore) {}

  createBookingSlots(docName: string) {
    return this.store.collection('bookingSlots').doc(docName);
    //errorin näyttö näytöllä lisättävä
    //.catch((error) => console.log(error))
  }

  // haetaan bookingSlots collectionista slotit.
  // Pitää vielä muuttaa niin että hakee vain valitun päivän slotit
  // metodi valueChanges() mahdollistaa reaktiivisen tiedon käsittelyn.
  // valueChanges() palauttaa observablen, joka tilataan booking-componentissa.
  getBookingSlots() {
    this.slots = this.store.collection('bookingSlots').valueChanges();
    return this.slots;
  }

  updateSlots(docName: string, slot: object) {
    this.store.collection('bookingSlots').doc(docName).set(slot);
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
