import { inject, Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Firestore, collection, addDoc, Timestamp ,query, orderBy, onSnapshot, collectionData} from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private firestore: Firestore = inject(Firestore); 
  chatCollection = collection(this.firestore, 'chats');
  data:any=[]

  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  logout() {
    this.afAuth.signOut();
    this.router.navigate(['/login']);
  }

  addChat(name: string, email: string, message: string) {
    console.log(name,email,message)
    const chatCollection = collection(this.firestore, 'chats');
    const data = {
      name: name,
      email: email,
      message: message,
      timestamp: Timestamp.now(),
    };
      try {
        addDoc(chatCollection, data);
        console.log('Chat added successfully!');
      } catch (error) {
        console.error('Error adding chat: ', error);
      }
  }

  getChats(callback: (chats: any[]) => void) {
    
      const q = query(this.chatCollection, orderBy('timestamp', 'asc'));
      onSnapshot(q, (snapshot) => {
        const chats = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          callback(chats);
      });
    
  }

  getUser() {
    return this.afAuth.authState;
  }

}
