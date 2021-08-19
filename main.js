const cols = 25;
const rows = 25;
const barriers = document.querySelectorAll(".barrier");

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

// Get the tank element
const tank = document.querySelector(".tank");
const aliens = document.querySelectorAll(".alienImg1");
const uglyAliens = document.querySelectorAll(".alienImg2");
const alien1 = document.querySelector("#row1LeftAlien");
const turret = document.querySelector(".turret");
const bullets = document.querySelectorAll(".bullet");
const base = document.querySelector("#ship");

// The x-velocity of the aliens
let alienXPosition = 0;
let alienXVelocity = 3;

// The x-velocity of the tank
let tankXPosition = 800;
let tankXVelocity = 20;

// The y velocity of the tank bullet
let bulletsArray = [];
let bulletsYPosition = 100;
let bulletsXPosition = 100;
let bulletsYVelocity = 20;

document.addEventListener("keydown", function (event) {
	console.log(event);
	// event.preventDefault();
	if (event.code == "KeyA" && tankXPosition >= 280) {
		tankXPosition = tankXPosition - 20;
		turret.style.left = `${tankXPosition}px`;
	}
	if (event.code == "KeyD" && tankXPosition <= 1330) {
		tankXPosition = tankXPosition + 20;
		turret.style.left = `${tankXPosition}px`;
	}
	if (event.code == "ArrowLeft" && tankXPosition >= 280) {
		tankXPosition = tankXPosition - 20;
		turret.style.left = `${tankXPosition}px`;
	}
	if (event.code == "ArrowRight" && tankXPosition <= 1330) {
		tankXPosition = tankXPosition + 20;
		turret.style.left = `${tankXPosition}px`;
	}
	if (event.code == "Space") {
		const bullet = document.createElement("div");
		bullet.className = "bullet";
		base.append(bullet);
		bulletsArray.push(bullet);
		
	}
	console.log(bulletsArray);
});

function update() {
	alienXPosition = alienXPosition + alienXVelocity;

	if (alienXPosition <= 180) {
		alienXVelocity = alienXVelocity * -1;
	}

	if (alienXPosition >= -175) {
		alienXVelocity = alienXVelocity * -1;
	}
	for (const alien of aliens) {
		alien.style.right = `${alienXPosition}px`;
	}

	for (const uglyAlien of uglyAliens) {
		uglyAlien.style.right = `${alienXPosition}px`;
	}

	bulletsYPosition = bulletsYPosition + bulletsYVelocity;
	for (const bullet of bullets) {
		bullet.style.bottom = `${bulletsYPosition}px`;
	}
}
setInterval(update, 20);
