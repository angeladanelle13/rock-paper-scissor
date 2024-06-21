const gameContainer = document.querySelector(".container"),
	userResult = document.querySelector(".user_result i"),
	cpuResult = document.querySelector(".cpu_result i"),
	result = document.querySelector(".result"),
	optionImages = document.querySelectorAll(".option_image"),
	userScoreElement = document.getElementById("user-score"),
	cpuScoreElement = document.getElementById("cpu-score"),
	restartButton = document.querySelector(".restart_button");

let userScore = 0;
let cpuScore = 0;

function restartGame() {
	userScore = 0;
	cpuScore = 0;
	userScoreElement.textContent = userScore;
	cpuScoreElement.textContent = cpuScore;
	userResult.className = cpuResult.className = "fas fa-hand-rock";
	result.textContent = "Rock, Paper, Scissors!";
	result.classList.remove("draw", "win", "lose");
	optionImages.forEach((image) => {
		image.classList.remove("active");
	});
	gameContainer.classList.remove("start");
}

restartButton.addEventListener("click", restartGame);

optionImages.forEach((image, index) => {
	image.addEventListener("click", (e) => {
		image.classList.add("active");

		userResult.className = cpuResult.className = "fas fa-hand-rock";
		result.textContent = "Thinking...";
		result.classList.remove("draw", "win", "lose");

		optionImages.forEach((image2, index2) => {
			index !== index2 && image2.classList.remove("active");
		});

		gameContainer.classList.add("start");

		let time = setTimeout(() => {
			gameContainer.classList.remove("start");

			let imageClass = e.target.querySelector("i").className;
			userResult.className = imageClass;

			let randomNumber = Math.floor(Math.random() * 3);
			let cpuImages = ["fas fa-hand-rock", "fas fa-hand-paper", "fas fa-hand-scissors"];

			cpuResult.className = cpuImages[randomNumber];

			let cpuValue = ["R", "P", "S"][randomNumber];
			let userValue = ["R", "P", "S"][index];

			let outcomes = {
				RR: "Draw",
				RP: "Cpu",
				RS: "User",
				PP: "Draw",
				PR: "User",
				PS: "Cpu",
				SS: "Draw",
				SR: "Cpu",
				SP: "User",
			};

			let outComeValue = outcomes[userValue + cpuValue];

			if (userValue === cpuValue) {
				result.textContent = "Draw";
				result.classList.add("draw");
			} else if (outComeValue === "User") {
				result.textContent = "User Wins!";
				result.classList.add("win");
				userScore++;
			} else {
				result.textContent = "Computer Wins!";
				result.classList.add("lose");
				cpuScore++;
			}

			userScoreElement.textContent = userScore;
			cpuScoreElement.textContent = cpuScore;
		}, 1400);
	});
});
