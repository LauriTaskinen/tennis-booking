import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth.service';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  users: any;
  allData: any;
  currentDate: string;
  currentUser: string | void;

  constructor(
    private store: AngularFirestore,
    private auth: AuthService,
    private localstorage: LocalstorageService
  ) {
    this.users;
    this.allData;
    this.currentDate = this.formatBookingDate(
      new Date().toLocaleDateString('en-US')
    );
    this.currentUser = this.auth.user?.id
      ? this.auth.user!.id
      : this.localstorage.currentUserID;
  }

  //https://softauthor.com/firebase-get-user-data-by-uid/
  createBooking(info: object): Promise<any> {
    return (
      this.store
        .collection('Bookings')
        .add(info)
        //errorin näyttö näytöllä lisättävä
        .catch((error) => console.log(error))
    );
  }

  // hakee käyttäjän varaukset tietokannasta
  getPersonalBookings(): Observable<any> {
    return this.store
      .collection('Bookings', (ref) =>
        ref
          .where('id', '==', this.currentUser)
          .where('date', '>=', new Date().toLocaleDateString('en-US'))
      )
      .snapshotChanges();
  }

  getAllBookings() {
    return this.store.collection('Bookings').snapshotChanges();
  }

  getUsers() {
    return this.store.collection('Users').snapshotChanges();
  }

  deleteBooking(id: string): void {
    this.store
      .collection('Bookings')
      .doc(id)
      .delete()
      .then(() => console.log(`deleted: ${id}`))
      .catch((error) => console.log(error));
  }

  formatBookingDate(date: string): string {
    const day = date.substring(date.indexOf('/') + 1, date.lastIndexOf('/'));
    const month = date.substring(0, date.indexOf('/'));
    const year = date.substring(date.lastIndexOf('/'), 9);
    return `${day}/${month}${year}`;
  }

  deleteOldBookings(cutoffDate: string): void {
    this.store
      .collection('Bookings', (ref) => ref.where('date', '<=', cutoffDate))
      .snapshotChanges()
      .subscribe((bookings) => {
        bookings.forEach((booking) => {
          this.deleteBooking(booking.payload.doc.id);
        });
      });
    console.log('all old bookings deleted!');
  }

  dateMonthAgo() {
    let date = new Date();
    date.setDate(date.getDate() - 28);
    return date.toLocaleDateString('en-US');
  }
}
