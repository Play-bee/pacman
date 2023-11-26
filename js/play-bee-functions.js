var PLAYER_ID = null;

function getParameterByName(name) {
	name = name.replace(/[\[\]]/g, "\\$&");
	var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
	var results = regex.exec(window.location.search);
	if (!results) return null;
	if (!results[2]) return "";
	return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function readUrlParams() {
	PLAYER_ID = getParameterByName("playerId");
	console.log({ PLAYER_ID });
	if (PLAYER_ID) return true;
	return false;
}
