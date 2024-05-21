class MapHandler {
	#map;
	#mapZoomLevel = 13;
	#mapEvent;

	constructor() {
		this.getPosition();
	}

	getPosition() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(this._loadMap.bind(this), () => {
				alert("Kunne ikke få posisjonen din");
			});
		}
	}

	_loadMap(position) {
		const { latitude, longitude } = position.coords;
		const coords = [latitude, longitude];
		this.#map = L.map("map").setView(coords, this.#mapZoomLevel);

		L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
			attribution:
				'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
		}).addTo(this.#map);

		this.#map.on("click", this._showForm.bind(this));
	}

	_showForm(mapE) {
		this.#mapEvent = mapE;
		document.querySelector(".form").classList.remove("hidden");
		document.querySelector(".form__input--distance").focus();
	}

	getMapEvent() {
		return this.#mapEvent;
	}

	renderWorkoutMarker(workout) {
		L.marker(workout.coords)
			.addTo(this.#map)
			.bindPopup(
				L.popup({
					maxWidth: 250,
					minWidth: 100,
					autoClose: false,
					closeOnClick: false,
					className: `${workout.type}-popup`,
				}),
			)
			.setPopupContent(
				`${workout.type === "running" ? "🏃‍♂️" : "🚴‍♀️"} ${workout.description}`,
			)
			.openPopup();
	}
}

class WorkoutHandler {
	constructor(mapHandler) {
		this.mapHandler = mapHandler;
		this.workouts = this._getLocalStorage() || [];
	}

	newWorkout(e) {
		e.preventDefault();

		const type = document.querySelector(".form__input--type").value;
		const distance = +document.querySelector(".form__input--distance").value;
		const duration = +document.querySelector(".form__input--duration").value;
		const cadence = +document.querySelector(".form__input--cadence").value;
		const elevation = +document.querySelector(".form__input--elevation").value;
		const { lat, lng } = this.mapHandler.getMapEvent().latlng;
		const coords = [lat, lng];

		const workout = {
			type,
			distance,
			duration,
			cadence,
			elevation,
			coords,
			description: `${type[0].toUpperCase()}${type.slice(
				1,
			)} on ${new Date().toLocaleDateString()}`,
		};

		this.workouts.push(workout);
		this._renderWorkout(workout);
		this.mapHandler.renderWorkoutMarker(workout);
		this._setLocalStorage();

		document.querySelector(".form").classList.add("hidden");
		document.querySelector(".form").reset();
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
      </li>
    `;
		document.querySelector(".workouts").insertAdjacentHTML("beforeend", html);
	}

	_getLocalStorage() {
		return JSON.parse(localStorage.getItem("workouts"));
	}

	_setLocalStorage() {
		localStorage.setItem("workouts", JSON.stringify(this.workouts));
	}
}

class UIHandler {
	constructor(workoutHandler) {
		this.workoutHandler = workoutHandler;
	}

	toggleElevationField() {
		document
			.querySelector(".form__input--elevation")
			.closest(".form__row")
			.classList.toggle("form__row--hidden");
		document
			.querySelector(".form__input--cadence")
			.closest(".form__row")
			.classList.toggle("form__row--hidden");
	}

	moveToPopup(e) {
		const workoutEl = e.target.closest(".workout");
		if (!workoutEl) return;

		const workout = this.workoutHandler
			.getWorkouts()
			.find((work) => work.id === workoutEl.dataset.id);
		if (!workout) return;

		if (e.target.classList.contains("workout__delete")) {
			this._removeWorkout(workoutEl);
			const index = this.workoutHandler.getWorkouts().indexOf(workout);
			this.workoutHandler.getWorkouts().splice(index, 1);
			this.workoutHandler._setLocalStorage();
			return;
		}

		const mapHandler = this.workoutHandler.mapHandler;
		mapHandler.map.setView(workout.coords, mapHandler.mapZoomLevel, {
			animate: true,
			pan: {
				duration: 1,
			},
		});

		workout.click();
	}

	_removeWorkout(workoutEl) {
		workoutEl.remove();
	}
}

document.addEventListener("DOMContentLoaded", () => {
	const username = sessionStorage.getItem("loggedInUser");

	if (!username) {
		alert("Du må logge inn for å se denne siden.");
		window.location.href = "../FrontPage/FrontPage.html";
		return;
	}

	const user = JSON.parse(localStorage.getItem(username));

	if (user) {
		document.querySelector("#user__fullname").textContent = user.name;
		document.querySelector("#user__email").textContent =
			`${username}@example.com`;
	}

	const logoutButton = document.querySelector("#logOut");
	logoutButton.addEventListener("click", () => {
		sessionStorage.removeItem("loggedInUser");
		window.location.href = "../FrontPage/FrontPage.html";
	});

	const friendsButton = document.querySelector("#friends");
	const friendsModal = document.querySelector("#friendsModal");
	const closeFriendsModal = document.querySelector("#closeFriendsModal");

	friendsButton.addEventListener("click", () => {
		friendsModal.style.display = "flex";
	});

	closeFriendsModal.addEventListener("click", () => {
		friendsModal.style.display = "none";
	});

	window.addEventListener("click", (event) => {
		if (event.target === friendsModal) {
			friendsModal.style.display = "none";
		}
	});

	const app = new App();
});

class App {
	constructor() {
		this.mapHandler = new MapHandler();
		this.workoutHandler = new WorkoutHandler(this.mapHandler);
		this.uiHandler = new UIHandler(this.workoutHandler);

		this._loadEventListeners();
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
