import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
// import { } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js"
// import { } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js"
import { collection, getFirestore, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// import { Firestore, doc, updateDoc } from '@angular/fire/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyALlw6lDUJlBqisQg7SiEZsJJv2fugPyNs",
  authDomain: "play-bee-games.firebaseapp.com",
  projectId: "play-bee-games",
  storageBucket: "play-bee-games.appspot.com",
  messagingSenderId: "635108761101",
  appId: "1:635108761101:web:348f8bdc817edf17147f44"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

const db = getFirestore();

// export const updateOneCreatedTournament = (change) =>
//   // console.log('change', change)
function updateOneCreatedTournament(change) {
  updateDoc(collection(db, `Tournaments/${tournamentId}`), {results: change});
}


    // const createdTournamentDocRef = doc(this.firestore, `Tournaments/${tournamentId}`);
    // updateDoc(createdTournamentDocRef, change)

  