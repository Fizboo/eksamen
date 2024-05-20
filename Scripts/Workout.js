class Workout {
	date = new Date();
	id = `${Date.now()}`.slice(-10);
	clicks = 0;

	constructor(coords, distance, duration) {
		this.coords = coords;
		this.distance = distance;
		this.duration = duration;
	}

	_setDescription() {
		const months = [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December",
		];
		this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
			months[this.date.getMonth()]
		} ${this.date.getDate()}`;
	}

	click() {
		this.clicks++;
	}
}

class Running extends Workout {
	type = "running";

	constructor(coords, distance, duration, cadence) {
		super(coords, distance, duration);
		this.cadence = cadence;
		this.calcPace();
		this._setDescription();
	}

	calcPace() {
		this.pace = this.duration / this.distance;
		return this.pace;
	}
}

class Cycling extends Workout {
	type = "cycling";

	constructor(coords, distance, duration, elevationGain) {
		super(coords, distance, duration);
		this.elevationGain = elevationGain;
		this.calcSpeed();
		this._setDescription();
	}

	calcSpeed() {
		this.speed = this.distance / (this.duration / 60);
		return this.speed;
	}
}

export class WorkoutHandler {
	#workouts = [];
	#mapHandler;

	constructor(mapHandler) {
		this.#mapHandler = mapHandler;
		this._getLocalStorage();
	}

	newWorkout(e) {
		e.preventDefault();

		const validInputs = (...inputs) =>
			inputs.every((inp) => Number.isFinite(inp));
		const allPositive = (...inputs) => inputs.every((inp) => inp > 0);

		const type = document.querySelector(".form__input--type").value;
		const distance = +document.querySelector(".form__input--distance").value;
		const duration = +document.querySelector(".form__input--duration").value;
		const { lat, lng } = this.#mapHandler.getMapEvent().latlng;
		let workout;

		if (type === "running") {
			const cadence = +document.querySelector(".form__input--cadence").value;
			if (
				!validInputs(distance, duration, cadence) ||
				!allPositive(distance, duration, cadence)
			) {
				alert("Inputs have to be positive numbers!");
				return;
			}
			workout = new Running([lat, lng], distance, duration, cadence);
		}

		if (type === "cycling") {
			const elevation = +document.querySelector(".form__input--elevation")
				.value;
			if (
				!validInputs(distance, duration, elevation) ||
				!allPositive(distance, duration)
			) {
				alert("Inputs have to be positive numbers!");
				return;
			}
			workout = new Cycling([lat, lng], distance, duration, elevation);
		}

		this.#workouts.push(workout);

		this.#mapHandler.renderWorkoutMarker(workout);
		this._renderWorkout(workout);
		this._hideForm();
		this._setLocalStorage();
	}

	_renderWorkout(workout) {
		const html = `
      <li class="workout workout--${workout.type}" data-id="${workout.id}">
        <h2 class="workout__title">${workout.description}</h2>
        <div class="workout__details">
          <span class="workout__icon">${
						workout.type === "running" ? "🏃‍♂️" : "🚴‍♀️"
					}</span>
          <span class="workout__value">${workout.distance}</span>
          <span class="workout__unit">km</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">⏱</span>
          <span class="workout__value">${workout.duration}</span>
          <span class="workout__unit">min</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">${workout.type === "running" ? "🦶" : "⛰"}</span>
          <span class="workout__value">${
						workout.type === "running"
							? workout.pace.toFixed(1)
							: workout.speed.toFixed(1)
					}</span>
          <span class="workout__unit">${
						workout.type === "running" ? "min/km" : "km/h"
					}</span>
        </div>
        <button class="workout__delete">Slett</button>
      </li>
    `;

		document.querySelector(".form").insertAdjacentHTML("afterend", html);
	}

	_hideForm() {
		document.querySelector(".form__input--distance").value =
			document.querySelector(".form__input--duration").value =
			document.querySelector(".form__input--cadence").value =
			document.querySelector(".form__input--elevation").value =
				"";

		const form = document.querySelector(".form");
		form.style.display = "none";
		form.classList.add("hidden");
		setTimeout(() => (form.style.display = "grid"), 1000);
	}

	_setLocalStorage() {
		localStorage.setItem("workouts", JSON.stringify(this.#workouts));
	}

	_getLocalStorage() {
		const data = JSON.parse(localStorage.getItem("workouts"));
		if (!data) return;
		this.#workouts = data;
		for (const work of this.#workouts) {
			this._renderWorkout(work);
		}
	}

	getWorkouts() {
		return this.#workouts;
	}
}
