import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  form = new FormGroup({
    name: new FormControl(''),
    date: new FormControl(''),
    time: new FormControl(''),
  });

  constructor(private store: AngularFirestore, private auth: AuthService) {}

  testPrint(info: any) {
    console.log(info);
  }

  //https://softauthor.com/firebase-get-user-data-by-uid/
  createBooking(info: object) {
    return (
      this.store
        .collection('Bookings')
        .add(info)
        //errorin näyttö näytöllä lisättävä
        .catch((error) => console.log(error))
    );
  }

  getPersonalBookings() {
    return this.store.collection('Bookings').snapshotChanges();

    /*let mydata = this.store.collection('Bookings').doc(this.auth.user.uid);
    let rres: any;
    mydata.get().subscribe((res) => (rres = res));

    for (const booking of rres) {
      console.log(booking.payload.doc.data());
    }
    */

    //console.log(doc.data()))
  }

  updateBookingData(data: any) {
    return this.store
      .collection('Bookings')
      .doc(data.payload.doc.uid)
      .set({ completed: true }, { merge: true });
  }

  getAllBookings() {}

  cancelBooking() {}
}
