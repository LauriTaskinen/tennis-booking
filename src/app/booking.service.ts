import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  constructor(private store: AngularFirestore, private auth: AuthService) {}

  testPrint(info:any) {
    console.log(info);
  }

  //https://softauthor.com/firebase-get-user-data-by-uid/
  createBooking(info:object) {
    return (
      this.store
        .collection('Bookings')
        .add(info)
        //errorin näyttö näytöllä lisättävä
        .catch((error) => console.log(error))
    );
  }

  getPersonalBookings(id: string) {
    return this.store.collection('Bookings').doc(id);
  }

  getAllBookings() {}

  cancelBooking() {}
}
