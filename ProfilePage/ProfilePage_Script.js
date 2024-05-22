document.addEventListener("DOMContentLoaded", () => {
	const exerciseForm = document.querySelector("#exerciseForm");
	const exerciseList = document.querySelector("#exerciseList");
	const exerciseResult = document.querySelector("#exerciseResult");
	const headerLogoutBtn = document.querySelector("#headerLogoutBtn");
	const logExerciseFromMap = document.querySelector("#logExerciseFromMap");
	const addExerciseModal = document.querySelector("#addExerciseModal");
	const closeModal = document.querySelector("#closeModal");

	let marker = null;
	let currentCoords = null;

	// Leaflet map initialization
	const map = L.map("map");

	// Geolocation to set map view to user's location
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				const { latitude, longitude } = position.coords;
				map.setView([latitude, longitude], 13);
			},
			() => {
				map.setView([51.505, -0.09], 13);
			},
		);
	} else {
		map.setView([51.505, -0.09], 13);
	}

	L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
		maxZoom: 19,
	}).addTo(map);

	const logout = () => {
		sessionStorage.removeItem("loggedInUser");
		window.location.href = "../FrontPage/FrontPage.html";
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		const type = document.querySelector("#exerciseType").value;
		const duration = document.querySelector("#exerciseDuration").value;
		const distance = document.querySelector("#exerciseDistance").value;

		const exercise = {
			type,
			duration,
			distance,
			date: new Date().toISOString().split("T")[0],
			coords: currentCoords,
		};

		const loggedInUser = sessionStorage.getItem("loggedInUser");
		if (loggedInUser) {
			const userExercises =
				JSON.parse(localStorage.getItem(`${loggedInUser}_exercises`)) || [];
			userExercises.push(exercise);
			localStorage.setItem(
				`${loggedInUser}_exercises`,
				JSON.stringify(userExercises),
			);
			exerciseResult.textContent = "Øvelse lagt til!";
			loadExercises();
		} else {
			exerciseResult.textContent =
				"Du må være logget inn for å legge til øvelser.";
		}

		exerciseForm.reset();
		closeModalPopup();
	};

	const loadExercises = () => {
		const loggedInUser = sessionStorage.getItem("loggedInUser");
		if (loggedInUser) {
			const userExercises =
				JSON.parse(localStorage.getItem(`${loggedInUser}_exercises`)) || [];
			exerciseList.innerHTML = "";
			userExercises.forEach((exercise, index) => {
				const listItem = document.createElement("li");
				listItem.innerHTML = `${exercise.date} - ${exercise.type} - ${
					exercise.duration
				} minutter - ${
					exercise.distance
				} meter <span class="coordinates" onclick="zoomToMarker(${
					exercise.coords.lat
				}, ${exercise.coords.lng})">(${exercise.coords.lat.toFixed(
					3,
				)}, ${exercise.coords.lng.toFixed(3)})</span>`;
				const deleteBtn = document.createElement("button");
				deleteBtn.textContent = "Slett";
				deleteBtn.classList.add("delete-btn");
				deleteBtn.addEventListener("click", () => {
					if (confirm("Vil du slette denne øvelsen?")) {
						removeExercise(index);
					}
				});
				listItem.appendChild(deleteBtn);
				exerciseList.appendChild(listItem);

				if (exercise.coords) {
					const exerciseMarker = L.marker(exercise.coords).addTo(map);
					exerciseMarker.on("click", () => {
						if (confirm("Vil du slette denne markøren?")) {
							removeExercise(index);
						}
					});
				}
			});
		} else {
			alert("Du må være logget inn for å se gjennomførte øvelser.");
			window.location.href = "../FrontPage/FrontPage.html";
		}
	};

	const removeExercise = (index) => {
		const loggedInUser = sessionStorage.getItem("loggedInUser");
		if (loggedInUser) {
			const userExercises =
				JSON.parse(localStorage.getItem(`${loggedInUser}_exercises`)) || [];
			const exerciseToRemove = userExercises[index];
			if (exerciseToRemove.coords) {
				map.eachLayer((layer) => {
					if (
						layer instanceof L.Marker &&
						layer.getLatLng().equals(exerciseToRemove.coords)
					) {
						map.removeLayer(layer);
					}
				});
			}
			userExercises.splice(index, 1);
			localStorage.setItem(
				`${loggedInUser}_exercises`,
				JSON.stringify(userExercises),
			);
			exerciseResult.textContent = "Øvelse fjernet!";
			loadExercises();
		}
	};

	const openModal = () => {
		exerciseResult.textContent = "";
		addExerciseModal.style.display = "flex";
	};

	const closeModalPopup = () => {
		addExerciseModal.style.display = "none";
		if (marker) {
			map.removeLayer(marker);
			marker = null;
			logExerciseFromMap.disabled = true;
		}
	};

	map.on("click", (e) => {
		if (marker) {
			map.removeLayer(marker);
		}
		marker = L.marker(e.latlng).addTo(map);
		currentCoords = e.latlng;
		logExerciseFromMap.disabled = false;
	});

	window.zoomToMarker = (lat, lng) => {
		map.setView([lat, lng], 15);
	};

	headerLogoutBtn.addEventListener("click", logout);
	exerciseForm.addEventListener("submit", handleSubmit);
	logExerciseFromMap.addEventListener("click", openModal);
	closeModal.addEventListener("click", closeModalPopup);
	window.addEventListener("click", (event) => {
		if (event.target === addExerciseModal) {
			closeModalPopup();
		}
	});

	const loggedInUser = sessionStorage.getItem("loggedInUser");
	if (loggedInUser) {
		document.getElementById("pageTitle").textContent =
			`Profilsiden til ${loggedInUser}`;
	}

	loadExercises();
});
