import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  constructor(private store: AngularFirestore, private auth: AuthService) {}

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

  // hakee käyttäjän varaukset tietokannasta
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

  cancelBooking(id: string) {
    this.store.collection('Bookings').doc(id).delete();
  }

  formatBookingDate(date: Date): string {
    return `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;
  }
}
