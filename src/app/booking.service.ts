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
    return this.store
      .collection('Bookings', (ref) => ref.where('id', '==', this.auth.user.id))
      .snapshotChanges();
  }

  getAllBookings() {
    return this.store.collection('Bookings').snapshotChanges();
  }

  cancelBooking(id: string) {
    this.store.collection('Bookings').doc(id).delete();
  }

  formatBookingDate(date: Date): string {
    return `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;
  }
}
