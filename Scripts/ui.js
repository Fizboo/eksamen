export class UIHandler {
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
