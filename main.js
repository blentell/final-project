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
const uglyAliens = document.querySelectorAll('.alienImg2');
const alien1 = document.querySelector("#row1LeftAlien");

// The x-velocity of the aliens
let alienXPosition = 0;
let alienXVelocity = 3;

// The x-velocity of the tank
let tankXPosition = 760;
let tankXVelocity = 20;

document.addEventListener("keydown", function (event) {
	console.log(event);
	if (event.code == "KeyA" && tankXPosition >= 210) {
		tankXPosition = tankXPosition - 20;
		tank.style.left = `${tankXPosition}px`;
	}
	if (event.code == "KeyD" && tankXPosition <= 1310) {
		tankXPosition = tankXPosition + 20;
		tank.style.left = `${tankXPosition}px`;
	}
	if (event.code == "ArrowLeft" && tankXPosition >= 210) {
		tankXPosition = tankXPosition - 20;
		tank.style.left = `${tankXPosition}px`;
	}
	if (event.code == "ArrowRight" && tankXPosition <= 1310) {
		tankXPosition = tankXPosition + 20;
		tank.style.left = `${tankXPosition}px`;
	}
});

function update() {
	alienXPosition = alienXPosition + alienXVelocity;
	if (alienXPosition <= 180)  {
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
	}
setInterval(update, 20);
