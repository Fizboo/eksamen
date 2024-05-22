document.addEventListener("DOMContentLoaded", () => {
	const exerciseForm = document.querySelector("#exerciseForm");
	const exerciseList = document.querySelector("#exerciseList");
	const exerciseResult = document.querySelector("#exerciseResult");
	const headerLogoutBtn = document.querySelector("#headerLogoutBtn");
	const logExerciseFromMap = document.querySelector("#logExerciseFromMap");
	const addExerciseButton = document.querySelector("#addExerciseButton");

	// Leaflet map initialization
	const map = L.map("map").setView([51.505, -0.09], 13);
	L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
		maxZoom: 19,
	}).addTo(map);

	let marker = null;

	const logout = () => {
		sessionStorage.removeItem("loggedInUser");
		window.location.href = "../FrontPage/FrontPage.html";
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		const type = document.querySelector("#exerciseType").value;
		const duration = document.querySelector("#exerciseDuration").value;

		const exercise = {
			type,
			duration,
			date: new Date().toISOString().split("T")[0],
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
	};

	const loadExercises = () => {
		const loggedInUser = sessionStorage.getItem("loggedInUser");
		if (loggedInUser) {
			const userExercises =
				JSON.parse(localStorage.getItem(`${loggedInUser}_exercises`)) || [];
			exerciseList.innerHTML = "";
			for (const exercise of userExercises) {
				const listItem = document.createElement("li");
				listItem.textContent = `${exercise.date} - ${exercise.type} - ${exercise.duration} minutter`;
				exerciseList.appendChild(listItem);
			}
		} else {
			alert("Du må være logget inn for å se gjennomførte øvelser.");
			window.location.href = "../FrontPage/FrontPage.html";
		}
	};

	const logExerciseFromMapHandler = () => {
		if (!marker) return;

		const coords = marker.getLatLng();
		const type = "Kart-basert øvelse";
		const duration = 60; // This can be modified to get input from user

		const exercise = {
			type,
			duration,
			date: new Date().toISOString().split("T")[0],
			coords,
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
			exerciseResult.textContent = "Øvelse lagt til fra kart!";
			loadExercises();
		} else {
			exerciseResult.textContent =
				"Du må være logget inn for å legge til øvelser.";
		}
	};

	map.on("click", (e) => {
		if (marker) {
			map.removeLayer(marker);
		}
		marker = L.marker(e.latlng).addTo(map);
		logExerciseFromMap.disabled = false;
	});

	headerLogoutBtn.addEventListener("click", logout);
	exerciseForm.addEventListener("submit", handleSubmit);
	logExerciseFromMap.addEventListener("click", logExerciseFromMapHandler);

	loadExercises();
});
