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

var winners = [];

export async function updateTournament(change) {
  const createdTournamentDocRef = await doc(firebaseConnect, `Tournaments/${change.tournamentId}`);
  const currentTournamentRef = await getDoc(createdTournamentDocRef);
  const updatedTournament = currentTournamentRef.data();
  updatedTournament.alreadyPlayed = updatedTournament.alreadyPlayed;

  const result = {
    date: change.date,
    positionresult: 0,
    userEmail: change.email,
    userId: change.id,
    userUid: change.userUid,
    winQty: 0,
    result: {
      date: change.date,
      qtyWin: 0,
      score: change.score,
      level: change.level,
      timePlayed: change.timePlayed
    }
  }

  updatedTournament.results.push(result);

  const playerIsInTournament = updatedTournament.registeredPlayers.some(x => x.id === change.id);
  if(!playerIsInTournament) {
    return;
  }

  updatedTournament.registeredPlayers.map((player) => {
    if(player.id === change.id) {
      player.played = true;
    }
  })


  const notAllPlayed = updatedTournament.registeredPlayers.some(x => x.played ===  false);

  if(updatedTournament.maxNumPlayers === updatedTournament.alreadyPlayed && !notAllPlayed) {

      await getWinners(updatedTournament);

      for(let player of winners) {
        const createdUserDocRef = await doc(firebaseConnect, `Users/${change.id}`);
        const currentWinnerUser = await getDoc(createdUserDocRef);

        const user = await currentWinnerUser.data();
        await updateUserQty(user, player, updatedTournament);
      }
  } else {
    if(updatedTournament && updatedTournament.id) {
      updatedTournament.registeredPlayers.map((player) => {
        if(player.id === change.id) {
          player.played = true;
        }
      });
      updateOneCreatedTournament(updatedTournament.id, updatedTournament);
    }
  }
}

async function getWinners(tournament) {
  let numberOfWinners = await calculateNumberOfWinners(tournament.registeredPlayers.length);
  let sortedPlayers = await calculateResults(tournament);

  winners = await sortedPlayers.slice(0, numberOfWinners);
  const premios = await repartirPremios(tournament.totalCollected, winners);

  for (let i = 0; i < winners.length; i++) {
    winners[i].winQty = premios[i];
    winners[i].position = i;
  }
  return;
}

function calculateNumberOfWinners(totalPlayers) {
  if (totalPlayers <= 5) {
    return 1;
  } else if (totalPlayers <= 10) {
    return 2;
  } else if (totalPlayers <= 20) {
    return 3;
  } else {
    return Math.ceil(totalPlayers * 0.10);
  }
}

function calculateResults(tournament) {
  tournament.results.sort((a, b) => {
    if (a.result.level > b.result.level) {
      return -1;
    }
    if (a.result.level < b.result.level) {
      return 1;
    }
    // Si valor1 es igual, ordenamos por valor2
    if (a.result.score > b.result.score) {
      return -1;
    }
    if (a.result.score < b.result.score) {
      return 1;
    }
    // Si valor2 también es igual, ordenamos por valor3
    if (a.result.timePlayed > b.result.timePlayed) {
      return -1;
    }
    if (a.result.timePlayed < b.result.timePlayed) {
      return 1;
    }
    return 0; // Todos los valores son iguales
  });
  return tournament.results;
}

function repartirPremios(totalPremio, winners) {
  let totalGanadores = winners.length;
  let sumOfInverses = 0;
  
  // Calcula la suma de los inversos
  for (let i = 1; i <= totalGanadores; i++) {
    sumOfInverses += 1 / i;
  }

  let premios = {};
  let premioDistribuido = 0;

  // Asigna premios basados en la inversa de la posición
  for (let i = 0; i < totalGanadores; i++) {
    let proporcion = (1 / (i + 1)) / sumOfInverses;
    let premio = totalPremio * proporcion;
    premios[i] = premio;
    premioDistribuido += premio;
  }

  // Ajusta por cualquier redondeo
  let diferencia = totalPremio - premioDistribuido;
  premios[winners[0].winQty] += diferencia; // Añadir cualquier diferencia al primer ganador

  return premios;
}

async function updateUserQty(currentUserPlayBee, player, tournament) {
  const totalCollected = tournament.totalCollected;

  currentUserPlayBee.currentQty = currentUserPlayBee.currentQty + player.winQty;
  // currentUserPlayBee.inGameQty = (currentUserPlayBee.inGameQty - tournament.registrationFee) - tournament.fee;

  const newWonTournament = {
    registrationFee: tournament.registrationFee,
    creationDate: tournament.creationDate,
    dueDate: tournament.dueDate,
    finishDate: new Date().toLocaleDateString(),
    game: tournament.game,
    tournamentCurrency: tournament.tournamentCurrency,
    maxNumPlayers: tournament.maxNumPlayers,
    id: tournament.id ? tournament.id : ''
  }

  currentUserPlayBee.wonTournaments.push(newWonTournament);

  const change = {
    inGameQty: currentUserPlayBee.inGameQty,
    currentQty: currentUserPlayBee.currentQty,
    wonTournaments: currentUserPlayBee.wonTournaments
  }

  const newWinnerUser = {
    uid: currentUserPlayBee.uid,
    id: currentUserPlayBee.id,
    email: currentUserPlayBee.email,
    name: currentUserPlayBee.name,
    lastName: currentUserPlayBee.lastName,
    nickName: currentUserPlayBee.nickName
  }

  tournament.finishDate = new Date().toLocaleDateString();
  tournament.winners.push(newWinnerUser);

  const createdUserDocRef = await doc(firebaseConnect, `Users/${currentUserPlayBee.id}`);
  return await updateDoc(createdUserDocRef, change).then(() => {
    if(tournament.id) {
      updateOneCreatedTournament(tournament.id, tournament)
    }
  });;
}

async function updateOneCreatedTournament(tournamentId, change) {
  const createdTournamentDocRef = await doc(firebaseConnect, `Tournaments/${tournamentId}`);
  return updateDoc(createdTournamentDocRef, change)
  // .then(() => {
  //   Swal.fire({
  //     title: 'Juego finalizado, puedes cerrar esta ventana.',
  //     color: '#f2c335',
  //     background: '#181a20f0',
  //     showCancelButton: false,
  //     confirmButtonText: 'OK',
  //     })
  // });
}