const cols = 16;
const rows = 16;
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
};
