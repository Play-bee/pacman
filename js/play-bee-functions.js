// import { updateTournament } from '../firebase.js'
// import { collection, getFirestore, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// const db = getFirestore();

// var PLAYER_ID = null;
// var PLAYER_UID = null;
// var TOURNAMENT_ID = null;
// var EMAIL = null;
var firebaseFc;

document.addEventListener('DOMContentLoaded', function() {
	import('../firebase.js').then(module => {
		firebaseFc = module; // Llamada a la función exportada desde el módulo
	}).catch(err => {
		console.error("Error al cargar el módulo:", err);
	});
});


function getParameterByName(name) {
	name = name.replace(/[\[\]]/g, "\\$&");
	var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
	var results = regex.exec(window.location.search);
	if (!results) return null;
	if (!results[2]) return "";
	return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function readIdUrlParams() {
	PLAYER_ID = getParameterByName("playerId");
	console.log('playerid', { PLAYER_ID });
	if (PLAYER_ID) return true;
	return false;
}

function readUidUrlParams() {
	PLAYER_UID = getParameterByName("playerUid");
	console.log('playerUid', { PLAYER_UID });
	if (PLAYER_UID) return true;
	return false;
}

function readUrlTournamentParams() {
	TOURNAMENT_ID = getParameterByName("tournamentId");
	console.log('tournamentId',{ TOURNAMENT_ID });
	if (TOURNAMENT_ID) return true;
	return false;
}

function readUrlEmailParams() {
	EMAIL = getParameterByName("email");
	console.log('email',{ EMAIL });
	if (EMAIL) return true;
	return false;
}

function sendResult(score, level, timePlayed) {
	const currentDate = new Date();
	const gameStats = {
		id: PLAYER_ID,
		tournamentId: TOURNAMENT_ID,
		userUid: PLAYER_UID,
		email: EMAIL,
		score: score,
		level: level,
		timePlayed: timePlayed,
		date: currentDate.toISOString(),
	};

	console.log("Juego finalizado - stats", gameStats);
	firebaseFc.updateTournament(gameStats);

	 // fetch("http://34.28.220.88:8000/tournaments/game-over", {
	// 	method: "POST",
	// 	headers: { "Content-Type": "application/json" },
	// 	body: JSON.stringify(gameStats),
	// })
	// 	.then((response) => response.json())
	// 	.then((data) => console.log({data}))
	// 	.catch((error) => console.error({error}));
}
// const db = getFirestore();

// const updateOneCreatedTournament = (change) =>
//   updateDoc(collection(db, `Tournaments/${tournamentId}`), {results: change});
