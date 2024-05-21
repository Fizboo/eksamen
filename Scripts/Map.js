import { renderWorkoutMarker } from "./ui.js";

export class MapHandler {
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
