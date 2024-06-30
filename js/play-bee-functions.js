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
	if (PLAYER_ID) return true;
	return false;
}

function readUidUrlParams() {
	PLAYER_UID = getParameterByName("playerUid");
	if (PLAYER_UID) return true;
	return false;
}

function readUrlTournamentParams() {
	TOURNAMENT_ID = getParameterByName("tournamentId");
	if (TOURNAMENT_ID) return true;
	return false;
}

function readUrlEmailParams() {
	EMAIL = getParameterByName("email");
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

	firebaseFc.updateTournament(gameStats);

}