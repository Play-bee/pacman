// // touch.js
// let touchStartX = 0;
// let touchStartY = 0;
// let touchEndX = 0;
// let touchEndY = 0;

// const gameArea = document.getElementById('body');

// gameArea.addEventListener("touchstart", (e) => {
//     e.preventDefault();
//     touchStartX = e.changedTouches[0].screenX;
//     touchStartY = e.changedTouches[0].screenY;
// });

// gameArea.addEventListener('touchend', (e) => {
//     touchEndX = e.changedTouches[0].screenX;
//     touchEndY = e.changedTouches[0].screenY;
//     handleGesture();
// });

// function handleGesture() {
//     const diffX = touchStartX - touchEndX;
//     const diffY = touchStartY - touchEndY;

//     if (Math.abs(diffX) > Math.abs(diffY)) {
//         if (diffX > 30) {
//             simulateKeydown(37); // Left
//         } else if (diffX < -30) {
//             simulateKeydown(39); // Right
//         }
//     } else {
//         if (diffY > 30) {
//             simulateKeydown(38); // Up
//         } else if (diffY < -30) {
//             simulateKeydown(40); // Down
//         }
//     }
// }

// function simulateKeydown(keyCode) {
//     console.log(keyCode)
//     const event = new KeyboardEvent("keydown", {
//         keyCode: keyCode,
//         which: keyCode,
//         key: getKeyByKeyCode(keyCode),
//         code: getCodeByKeyCode(keyCode),
//         bubbles: true
//     });
//     document.dispatchEvent(event);
// }

// function getKeyByKeyCode(keyCode) {
//     switch (keyCode) {
//         case 37: return 'ArrowLeft';
//         case 38: return 'ArrowUp';
//         case 39: return 'ArrowRight';
//         case 40: return 'ArrowDown';
//         case 13: return 'Enter'
//     }
// }

// function getCodeByKeyCode(keyCode) {
//     switch (keyCode) {
//         case 37: return 'ArrowLeft';
//         case 38: return 'ArrowUp';
//         case 39: return 'ArrowRight';
//         case 40: return 'ArrowDown';
//         case 13: return 'Enter'
//     }
// }

// document.addEventListener("keyup", handleGesture);


            let touchStartX = 0;
			let touchStartY = 0;
			let touchEndX = 0;
			let touchEndY = 0;
	
			const gameArea = document.getElementById('board');
			console.log(gameArea)
	
			gameArea.addEventListener("touchstart", (e) => {
				// e.preventDefault();
				touchStartX = e.changedTouches[0].screenX;
				touchStartY = e.changedTouches[0].screenY;
			}, { passive: true });
	
			gameArea.addEventListener('touchend', (e) => {
				touchEndX = e.changedTouches[0].screenX;
				touchEndY = e.changedTouches[0].screenY;
				handleGesture();
			}, { passive: true });
	
			function handleGesture() {
				const diffX = touchStartX - touchEndX;
				const diffY = touchStartY - touchEndY;
	
				if (Math.abs(diffX) > Math.abs(diffY)) {
					if (diffX > 30) {
						simulateKeydown(37); // Left
					} else if (diffX < -30) {
						simulateKeydown(39); // Right
					}
				} else {
					if (diffY > 30) {
						simulateKeydown(38); // Up
					} else if (diffY < -30) {
						simulateKeydown(40); // Down
					}
				}
			}
	
			function getKeyByKeyCode(keyCode) {
				switch (keyCode) {
					case 37: return 'ArrowLeft';
					case 38: return 'ArrowUp';
					case 39: return 'ArrowRight';
					case 40: return 'ArrowDown';
					default: return 'Enter';
				}
			}
	
			function getCodeByKeyCode(keyCode) {
				switch (keyCode) {
					case 37: return simulateKeydown(37);
					case 38: return simulateKeydown(38);
					case 39: return simulateKeydown(39);
					case 40: return simulateKeydown(40);
					default: return 'Enter';
				}
			}