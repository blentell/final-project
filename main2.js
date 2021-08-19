// Get the elements we need
const tank = document.querySelector("#turret");
const alien = document.querySelectorAll(".alien");
const alien2 = document.querySelectorAll(".alien2");
const barrier1 = document.querySelector(".barrier1");
const barrier2 = document.querySelector(".barrier2");
const barrier3 = document.querySelector(".barrier3");
const barrier4 = document.querySelector(".barrier4");
const bullets = document.querySelector("#bullets");

const turret = {
	left: 760,
	top: 1100,
};

const bulletsArray = [];

const aliens = [
	{ left: 350, top: 250 },
	{ left: 450, top: 250 },
	{ left: 550, top: 250 },
	{ left: 650, top: 250 },
	{ left: 750, top: 250 },
	{ left: 850, top: 250 },
	{ left: 950, top: 250 },
	{ left: 1050, top: 250 },
	{ left: 1150, top: 250 },

	{ left: 350, top: 50 },
	{ left: 450, top: 50 },
	{ left: 550, top: 50 },
	{ left: 650, top: 50 },
	{ left: 750, top: 50 },
	{ left: 850, top: 50 },
	{ left: 950, top: 50 },
	{ left: 1050, top: 50 },
	{ left: 1150, top: 50 },
];

const aliens2 = [
	{ left: 350, top: 170 },
	{ left: 450, top: 170 },
	{ left: 550, top: 170 },
	{ left: 650, top: 170 },
	{ left: 750, top: 170 },
	{ left: 850, top: 170 },
	{ left: 950, top: 170 },
	{ left: 1050, top: 170 },
	{ left: 1150, top: 170 },

	{ left: 350, top: 370 },
	{ left: 450, top: 370 },
	{ left: 550, top: 370 },
	{ left: 650, top: 370 },
	{ left: 750, top: 370 },
	{ left: 850, top: 370 },
	{ left: 950, top: 370 },
	{ left: 1050, top: 370 },
	{ left: 1150, top: 370 },
];

const cols = 25;
const rows = 25;
const barriers = document.querySelectorAll(".barriers");

// Add rows of divs
for (const barrier of barriers) {
	for (let i = 0; i < rows; i++) {
		const row = document.createElement("div");
		row.className = "row";

		// Add boxes of divs for each row
		for (let j = 0; j < cols; j++) {
			const box = document.createElement("div");
			box.className = "box";
			// Add the box to the row
			row.appendChild(box);
		}

		// Add each row of boxes to the body of the document

		barrier.appendChild(row);
	}
}

// Track the score
let playerScore = 0;

document.addEventListener("keydown", function (event) {
	event.preventDefault();
	if (event.code == "KeyA") {
		turret.left = turret.left - 20;
	}
	if (event.code == "KeyD") {
		turret.left = turret.left + 20;
	}
	if (event.code == "Space") {
		bulletsArray.push({
			left: turret.left + 50,
			top: turret.top - 60,
		});
		drawBullets();
	}
	drawTank();
});

function drawBullets() {
	bullets.innerHTML = "";
	for (let i = 0; i < bulletsArray.length; i++) {
		bullets.innerHTML += `<div class='bullet1' style='left:${bulletsArray[i].left}px; top:${bulletsArray[i].top}px'></div>`;
	}
}

function moveBullets() {
	for (let i = 0; i < bulletsArray.length; i++) {
		bulletsArray[i].top = bulletsArray[i].top - 8;
	}
}

function drawTank() {
	tank.style.left = turret.left + "px";
	tank.style.top = turret.top + "px";
}

function drawAliens() {
	document.querySelector("#aliens").innerHTML = "";
	for (let i = 0; i < aliens.length; i++) {
		document.querySelector(
			"#aliens"
		).innerHTML += `<div class='alien' style='left:${aliens[i].left}px; top:${aliens[i].top}px'></div>`;
	}
	for (let j = 0; j < aliens2.length; j++) {
		document.querySelector(
			"#aliens"
		).innerHTML += `<div class='alien2' style='left:${aliens2[j].left}px; top:${aliens2[j].top}px'></div>`;
	}
}

function moveAliens() {
  for (let i = 0; i < aliens.length; i++) {
    // aliens[i].left = aliens[i].left + 2;
    if (aliens[0].left <= 0) {
      console.log("Im stuck");
      aliens[i].left = aliens[i].left + 2;
    }
    // if (aliens[0].left >= 1500) {
    //   console.log("why me?");
    //   aliens[i].left = aliens[i].left - 2;
    // }    
  }
}

function collisionDetection() {
	for (let alien = 0; alien < aliens.length; alien++) {
		for (let bullet = 0; bullet < bulletsArray.length; bullet++) {
			if (
				bulletsArray[bullet].left >= aliens[alien].left &&
				bulletsArray[bullet].left <= aliens[alien].left + 100 &&
				bulletsArray[bullet].top <= aliens[alien].top + 100 &&
				bulletsArray[bullet].top >= aliens[alien].top
			) {
				aliens.splice(alien, 1);
				bulletsArray.splice(bullet, 1);
			}
		}
		for (let alien2 = 0; alien2 < aliens2.length; alien2++) {
			for (let bullet = 0; bullet < bulletsArray.length; bullet++) {
				if (
					bulletsArray[bullet].left >= aliens2[alien2].left &&
					bulletsArray[bullet].left <= aliens2[alien2].left + 100 &&
					bulletsArray[bullet].top <= aliens2[alien2].top + 100 &&
					bulletsArray[bullet].top >= aliens2[alien2].top
				) {
					aliens2.splice(alien2, 1);
					bulletsArray.splice(bullet, 1);
				}
			}
		}
	}
}

function gameLoop() {
	setTimeout(gameLoop, 10);
	moveBullets();
	drawBullets();
	moveAliens();
	drawAliens();
	collisionDetection();
}

gameLoop();
