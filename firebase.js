import { getFirestore, collection, addDoc, getDoc, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js"

const firebaseConfig = {
    apiKey: "AIzaSyALlw6lDUJlBqisQg7SiEZsJJv2fugPyNs",
    authDomain: "play-bee-games.firebaseapp.com",
    projectId: "play-bee-games",
    storageBucket: "play-bee-games.appspot.com",
    messagingSenderId: "635108761101",
    appId: "1:635108761101:web:348f8bdc817edf17147f44"  
  }

  const app = initializeApp(firebaseConfig);
  const firebaseConnect = getFirestore(app);

  console.log('app',app);

  

// export const updateOneCreatedTournament = (change) =>
//   // console.log('change', change)
// function updateOneCreatedTournament(change) {
//   updateDoc(collection(db, `Tournaments/${tournamentId}`), {results: change});
// }


    // const createdTournamentDocRef = doc(this.firestore, `Tournaments/${tournamentId}`);
    // updateDoc(createdTournamentDocRef, change)

  