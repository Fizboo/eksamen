const loginModal = document.querySelector("#loginModal");
const registerModal = document.querySelector("#registerModal");
const headerLoginBtn = document.querySelector("#headerLoginBtn");
const showRegister = document.querySelector("#showRegister");
const loginForm = document.querySelector("#loginForm");
const registerForm = document.querySelector("#registerForm");

document.addEventListener("DOMContentLoaded", () => {
	loginModal.style.display = "flex"; // Show login modal by default
});

function closeModal(modalId) {
	document.getElementById(modalId).style.display = "none";
}

headerLoginBtn.addEventListener("click", () => {
	loginModal.style.display = "flex";
});

showRegister.addEventListener("click", (event) => {
	event.preventDefault();
	loginModal.style.display = "none";
	registerModal.style.display = "flex";
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

	const user = {
		name,
		username,
		password,
	};

	localStorage.setItem(username, JSON.stringify(user));
	alert("Registrering velykket!");

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
		alert("Innlogging velykket!");
		loginForm.reset();

		sessionStorage.setItem("loggedInUser", username);
		window.location.href = "../ProfileDashBoard/ProfileDashBoard.html";
	} else {
		alert("Feil brukernavn eller passord. Vennligst prøv igjen.");
	}
});
