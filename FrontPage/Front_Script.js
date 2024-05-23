document.addEventListener("DOMContentLoaded", () => {
	const loginModal = document.querySelector("#loginModal");
	const registerModal = document.querySelector("#registerModal");
	const headerLoginBtn = document.querySelector("#headerLoginBtn");
	const showRegister = document.querySelector("#showRegister");
	const showLogin = document.querySelector("#showLogin");
	const loginForm = document.querySelector("#loginForm");
	const registerForm = document.querySelector("#registerForm");

	loginModal.style.display = "flex";
	registerModal.style.display = "none";

	headerLoginBtn.addEventListener("click", () => {
		loginModal.style.display = "flex";
		registerModal.style.display = "none";
	});

	showRegister.addEventListener("click", (event) => {
		event.preventDefault();
		loginModal.style.display = "none";
		registerModal.style.display = "flex";
	});

	showLogin.addEventListener("click", (event) => {
		event.preventDefault();
		registerModal.style.display = "none";
		loginModal.style.display = "flex";
	});

	window.addEventListener("click", (event) => {
		if (event.target === loginModal) {
			loginModal.style.display = "none";
		}
		if (event.target === registerModal) {
			registerModal.style.display = "none";
		}
	});

	registerForm.addEventListener("submit", (event) => {
		event.preventDefault();

		const name = document.querySelector("#registerName").value;
		const username = document.querySelector("#registerUsername").value;
		const password = document.querySelector("#registerPassword").value;

		if (localStorage.getItem(username)) {
			alert("Brukernavn er allerede tatt. Vennligst velg et annet.");
			return;
		}

		const user = { name, username, password };

		localStorage.setItem(username, JSON.stringify(user));
		alert("Registrering vellykket!");

		registerForm.reset();
		registerModal.style.display = "none";
		loginModal.style.display = "flex";
	});

	loginForm.addEventListener("submit", (event) => {
		event.preventDefault();

		const username = document.querySelector("#loginUsername").value;
		const password = document.querySelector("#loginPassword").value;

		const user = JSON.parse(localStorage.getItem(username));

		if (user && user.password === password) {
			loginForm.reset();
			sessionStorage.setItem("loggedInUser", username);
			window.location.href = "../ProfilePage/ProfilePage.html";
		} else {
			alert("Feil brukernavn eller passord. Vennligst prøv igjen.");
		}
	});

	const closeButtons = document.querySelectorAll(".close");
	for (const closeBtn of closeButtons) {
		closeBtn.addEventListener("click", () => {
			const modal = closeBtn.closest(".modal");
			modal.style.display = "none";
		});
	}
});
