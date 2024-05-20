import { MapHandler } from "./Map.js";
import { WorkoutHandler } from "./Workout.js";
import { UIHandler } from "./ui.js";

const logoutButton = document.querySelector("#logOut");

logoutButton.addEventListener("click", () => {
	localStorage.removeItem("users");
	window.location.href = "sites/index.html";
});

class App {
	constructor() {
		this.mapHandler = new MapHandler(this);
		this.workoutHandler = new WorkoutHandler(this.mapHandler);
		this.uiHandler = new UIHandler(this.workoutHandler);

		this._loadEventListeners();
		this.mapHandler.getPosition();
	}

	_loadEventListeners() {
		document
			.querySelector(".form")
			.addEventListener(
				"submit",
				this.workoutHandler.newWorkout.bind(this.workoutHandler),
			);
		document
			.querySelector(".form__input--type")
			.addEventListener("change", this.uiHandler.toggleElevationField);
		document
			.querySelector(".workouts")
			.addEventListener(
				"click",
				this.uiHandler.moveToPopup.bind(this.uiHandler),
			);
	}
}

const app = new App();
