// Get the elements we need
const tank = document.querySelector("#turret");
const alien = document.querySelectorAll(".alien");
const alien2 = document.querySelectorAll(".alien2");
const barrier1 = document.querySelector(".barrier1");
const barrier2 = document.querySelector(".barrier2");
const barrier3 = document.querySelector(".barrier3");
const barrier4 = document.querySelector(".barrier4");
const bullets = document.querySelector("#bullets");
const bullets2 = document.querySelector("#bullets2");
const displayScore = document.querySelector("#score");
const displayLevel = document.querySelector('#level');
const displayLives = document.querySelector("#lives");
const alienLoad = document.querySelector('#aliens');

tankLaser = new Audio("./sound/shoot.wav");
tankLaser.volume = 0.2;
// alienLaser = new Audio("./sound/sfx_laser2.ogg");
gameOver = new Audio("./sound/sfx_lose.ogg");
alienDeath = new Audio("./sound/invaderkilled.wav");
alienDeath.volume = 0.2;
lostLife = new Audio("./sound/explosion.wav");
lostLife.volume = 0.2;
alienMovement = new Audio("./sound/spaceinvaders1.mpeg");
alienMovement.volume = 0.1;

// TODO: Create splash page
// TODO: Limit number of bullets per space click --- DONE
// TODO: Figure out how to reset aliens for level completion --- DONE
// TODO: Implement high score system
// TODO: Add music and sounds --- DONE

let throttle;

const gameState = {
	leftPressed: false,
	rightPressed: false,
	spacePressed: false,
};

const turret = {
	left: 760,
	top: 1100,
};

const bulletsArray = [];
const alienBulletsArray = [];

let aliens = [
	// Row 1 of aliens
	{ left: 350, top: 50 },
	{ left: 450, top: 50 },
	{ left: 550, top: 50 },
	{ left: 650, top: 50 },
	{ left: 750, top: 50 },
	{ left: 850, top: 50 },
	{ left: 950, top: 50 },
	{ left: 1050, top: 50 },
	{ left: 1150, top: 50 },
	// Row 3 of aliens
	{ left: 350, top: 270 },
	{ left: 450, top: 270 },
	{ left: 550, top: 270 },
	{ left: 650, top: 270 },
	{ left: 750, top: 270 },
	{ left: 850, top: 270 },
	{ left: 950, top: 270 },
	{ left: 1050, top: 270 },
	{ left: 1150, top: 270 },
];

let aliens2 = [
	// Row 2 of aliens
	{ left: 350, top: 160 },
	{ left: 450, top: 160 },
	{ left: 550, top: 160 },
	{ left: 650, top: 160 },
	{ left: 750, top: 160 },
	{ left: 850, top: 160 },
	{ left: 950, top: 160 },
	{ left: 1050, top: 160 },
	{ left: 1150, top: 160 },
	// Row 4 of aliens
	{ left: 350, top: 380 },
	{ left: 450, top: 380 },
	{ left: 550, top: 380 },
	{ left: 650, top: 380 },
	{ left: 750, top: 380 },
	{ left: 850, top: 380 },
	{ left: 950, top: 380 },
	{ left: 1050, top: 380 },
	{ left: 1150, top: 380 },
];

// // Create barriers
// const cols = 25;
// const rows = 25;
// const barriers = document.querySelectorAll(".barriers");

// // Add rows of divs
// for (const barrier of barriers) {
// 	for (let i = 0; i < rows; i++) {
// 		const row = document.createElement("div");
// 		row.className = "row";

// 		// Add boxes of divs for each row
// 		for (let j = 0; j < cols; j++) {
// 			const box = document.createElement("div");
// 			box.className = "box";
// 			// Add the box to the row
// 			row.appendChild(box);
// 		}
// 		// Add each row of boxes to the body of the document
// 		barrier.appendChild(row);
// 	}
// }

// Track the score
let score = 0;

function updateScore() {
	displayScore.innerHTML = `Score: ${score}`;
	displayLevel.innerHTML = `Level: ${level}`;
}

// Track the tank lives
let lives = 3;

function endGame() {
	alert("Game Over!");
	gameOver.play();
}

function updateLives() {
	if (lives <= 0) {
		endGame();
		reset();
	}
}

function reset() {
	lives = 3;
	location.reload();
}

// Set the game level
let level = 1;

function nextLevel() {
	level = level + 1;
	alert(`Next level: ${level}`);
	aliens = [
		// Row 1 of aliens
		{ left: 350, top: 50 },
		{ left: 450, top: 50 },
		{ left: 550, top: 50 },
		{ left: 650, top: 50 },
		{ left: 750, top: 50 },
		{ left: 850, top: 50 },
		{ left: 950, top: 50 },
		{ left: 1050, top: 50 },
		{ left: 1150, top: 50 },
		// Row 3 of aliens
		{ left: 350, top: 270 },
		{ left: 450, top: 270 },
		{ left: 550, top: 270 },
		{ left: 650, top: 270 },
		{ left: 750, top: 270 },
		{ left: 850, top: 270 },
		{ left: 950, top: 270 },
		{ left: 1050, top: 270 },
		{ left: 1150, top: 270 },
	];

	aliens2 = [
		// Row 2 of aliens
		{ left: 350, top: 160 },
		{ left: 450, top: 160 },
		{ left: 550, top: 160 },
		{ left: 650, top: 160 },
		{ left: 750, top: 160 },
		{ left: 850, top: 160 },
		{ left: 950, top: 160 },
		{ left: 1050, top: 160 },
		{ left: 1150, top: 160 },
		// Row 4 of aliens
		{ left: 350, top: 380 },
		{ left: 450, top: 380 },
		{ left: 550, top: 380 },
		{ left: 650, top: 380 },
		{ left: 750, top: 380 },
		{ left: 850, top: 380 },
		{ left: 950, top: 380 },
		{ left: 1050, top: 380 },
		{ left: 1150, top: 380 },
	];
		
}

function tankLives() {
	displayLives.innerHTML = `Lives Remaining: ${lives}`;
}

const tankWidth = 120;

function updateTank() {
	if (gameState.leftPressed) {
		if (turret.left >= 10) {
			turret.left = turret.left - 5;
		}
	}
	if (gameState.rightPressed) {
		if (turret.left <= 1490) {
			turret.left = turret.left + 5;
		}
	}
	if (gameState.spacePressed) {
		gameState.spacePressed = false;
		bulletsArray.push({
			left: turret.left + 45,
			top: turret.top - 20,
		}),
			tankLaser.play();
		alienBulletsArray.push({
			left: aliens2[Math.floor(Math.random() * 16)].left + 50,
			top: aliens2[Math.floor(Math.random() * 16)].top - 20,
			left: aliens[Math.floor(Math.random() * 16)].left + 50,
			top: aliens[Math.floor(Math.random() * 16)].top - 20,
		});
		drawBullets();
	}
	drawTank();
}

// Add the ability to move the tank and shoot
function onKeyDown(event) {
	if (event.code == "KeyA") {
		gameState.leftPressed = true;
	}
	if (event.code == "KeyD") {
		gameState.rightPressed = true;
	}
	if (event.code == "Space") {
		event.preventDefault();
		gameState.spacePressed = true;
	}
}

function onKeyUp(event) {
	if (event.code == "KeyA") {
		gameState.leftPressed = false;
	}
	if (event.code == "KeyD") {
		gameState.rightPressed = false;
	}
	if (event.code == "Space") {
		gameState.spacePressed = false;
	}
}

// Draw the tank bullets
function drawBullets() {
	bullets.innerHTML = "";
	for (let i = 0; i < bulletsArray.length; i++) {
		bullets.innerHTML += `<div class='bullet1' style='left:${bulletsArray[i].left}px; top:${bulletsArray[i].top}px'></div>`;
	}
}

// Draw the alien bullets
function drawAlienBullets() {
	bullets2.innerHTML = "";
	for (let i = 0; i < alienBulletsArray.length; i++) {
		bullets2.innerHTML += `<div class='bullet2' style='left:${alienBulletsArray[i].left}px; top:${alienBulletsArray[i].top}px'></div>`;
		// alienLaser.play();
	}
}

// Move the tank bullets on the screen
function moveBullets() {
	for (let i = 0; i < bulletsArray.length; i++) {
		bulletsArray[i].top = bulletsArray[i].top - 2;
	}
}

// Move the alien bullets on the screen
function moveAlienBullets() {
	for (let i = 0; i < alienBulletsArray.length; i++) {
		alienBulletsArray[i].top = alienBulletsArray[i].top + 2;
	}
}

// Draw the tank on the screen
function drawTank() {
	tank.style.opacity = "100";
	tank.style.left = turret.left + "px";
	tank.style.top = turret.top + "px";
}

// Draw the both sets of aliens on the screen
function drawAliens() {
	document.querySelector("#aliens").innerHTML = "";
	// Loop 1 for the first array
	for (let i = 0; i < aliens.length; i++) {
		document.querySelector(
			"#aliens"
		).innerHTML += `<div class='alien' style='left:${aliens[i].left}px; top:${aliens[i].top}px'></div>`;
	}
	// Loop 2 for the second array
	for (let j = 0; j < aliens2.length; j++) {
		document.querySelector(
			"#aliens"
		).innerHTML += `<div class='alien2' style='left:${aliens2[j].left}px; top:${aliens2[j].top}px'></div>`;
	}
}

// Assign a velocity for the alien movement
let alienVelocity = 0.6 + (level - 1);
// Make the aliens move
function moveAliens() {
	// Loop 1 for the first array
	for (let i = 0; i < aliens.length; i++) {
		if (aliens[0].left <= 0) {
			alienVelocity = Math.abs(alienVelocity);
		}
		if (aliens[i].left >= 1500) {
			alienVelocity = Math.abs(alienVelocity) * -1;
		}
		if (aliens[i].top >= 1100) {
			endGame();
			reset();
		}
		aliens[i].left = aliens[i].left + alienVelocity;
		aliens[i].top = aliens[i].top + 0.04;
	}
	// Loop 2 for the second array
	for (let j = 0; j < aliens2.length; j++) {
		if (aliens2[0].left <= 0) {
			alienVelocity = Math.abs(alienVelocity);
		}
		if (aliens2[j].left >= 1500) {
			alienVelocity = Math.abs(alienVelocity) * -1;
		}
		if (aliens2[j].top >= 1100) {
			endGame();
			reset();
		}
		aliens2[j].left = aliens2[j].left + alienVelocity;
		aliens2[j].top = aliens2[j].top + 0.04;
	}
}

// Create collision detection
function alienCollisionDetection() {
	// Loop 1 for the first array of aliens
	if (aliens.length === 0 && aliens2.length === 0) {		
		nextLevel();		
	}
	for (let alien = 0; alien < aliens.length; alien++) {
		for (let bullet = 0; bullet < bulletsArray.length; bullet++) {
			if (
				bulletsArray[bullet].left >= aliens[alien].left &&
				bulletsArray[bullet].left <= aliens[alien].left + 100 &&
				bulletsArray[bullet].top <= aliens[alien].top + 100 &&
				bulletsArray[bullet].top >= aliens[alien].top
			) {
				aliens.splice(alien, 1);
				alienDeath.play();
				bulletsArray.splice(bullet, 1);
				score = score + 50;
			}
			if (bulletsArray[bullet].top <= 0) {
				bulletsArray.splice(bullet, 1);
			}
		}
		// Loop 2 for the second array of aliens
		for (let alien2 = 0; alien2 < aliens2.length; alien2++) {
			for (let bullet = 0; bullet < bulletsArray.length; bullet++) {
				if (
					bulletsArray[bullet].left >= aliens2[alien2].left &&
					bulletsArray[bullet].left <= aliens2[alien2].left + 100 &&
					bulletsArray[bullet].top <= aliens2[alien2].top + 100 &&
					bulletsArray[bullet].top >= aliens2[alien2].top
				) {
					aliens2.splice(alien2, 1);
					alienDeath.play();
					score = score + 25;
					bulletsArray.splice(bullet, 1);
				}
				if (bulletsArray[bullet].top <= 0) {
					bulletsArray.splice(bullet, 1);
				}
			}
		}
	}
}

// Create tank collision detection
function tankCollisionDetection() {
	// Loop 1 for the alien bullets
	for (let bullet = 0; bullet < alienBulletsArray.length; bullet++) {
		if (
			alienBulletsArray[bullet].left >= turret.left &&
			alienBulletsArray[bullet].left <= turret.left + 110 &&
			alienBulletsArray[bullet].top <= turret.top + 110 &&
			alienBulletsArray[bullet].top >= turret.top
		) {
			lostLife.play();
			tank.style.opacity = "0";
			alienBulletsArray.splice(bullet, 1);
			lives = lives - 1;
		}
		if (alienBulletsArray[bullet].top >= 1150) {
			alienBulletsArray.splice(bullet, 1);
		}
	}
}

// Create the repeating functions loop
function spaceInvadersLoop() {
	window.requestAnimationFrame(spaceInvadersLoop);
	alienMovement.play();
	updateTank();
	updateScore();
	tankLives();
	moveAliens();
	drawAliens();
	moveAlienBullets();
	drawAlienBullets();
	moveBullets();
	drawBullets();
	alienCollisionDetection();
	tankCollisionDetection();
	setTimeout(updateLives, 1000);
	// barrierCollisionDetection();
}

spaceInvadersLoop();
window.addEventListener("keydown", onKeyDown);
window.addEventListener("keyup", onKeyUp);
window.requestAnimationFrame(spaceInvadersLoop);

// ========================== Unused for now ===================================
// Create barrier collision detection
// function barrierCollisionDetection() {
// 	for (let barrier1 = 0; barrier1 < barrierArray.length; barrier1++) {
// 		for (let bullet = 0; bullet < bulletsArray.length; bullet++) {
// 			if (
// 				bulletsArray[bullet].left >= barrierArray[barrier1].left &&
// 				bulletsArray[bullet].left <= barrierArray[barrier1].left + 100 &&
// 				bulletsArray[bullet].top <= barrierArray[barrier1].top + 100 &&
// 				bulletsArray[bullet].top >= barrierArray[barrier1].top
// 			) {
// 				barrierArray.splice(barrier1, 1);
// 				bulletsArray.splice(bullet, 1);
// 			}
// 		}
// 	}
// }
