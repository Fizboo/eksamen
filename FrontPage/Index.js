const loginModal = document.querySelector("#loginModal");
const registerModal = document.querySelector("#registerModal");
const loginBtn = document.querySelector("#loginBtn");
const registerBtn = document.querySelector("#registerBtn");
const loginClose = loginModal.querySelector(".close");
const registerClose = registerModal.querySelector(".close");
const showRegister = document.querySelector("#showRegister");

loginBtn.addEventListener("click", () => {
	loginModal.style.display = "block";
});

registerBtn.addEventListener("click", () => {
	registerModal.style.display = "block";
});

loginClose.addEventListener("click", () => {
	loginModal.style.display = "none";
});

registerClose.addEventListener("click", () => {
	registerModal.style.display = "none";
});

showRegister.addEventListener("click", (event) => {
	event.preventDefault();
	loginModal.style.display = "none";
	registerModal.style.display = "block";
});

window.addEventListener("click", (event) => {
	if (event.target === loginModal) {
		loginModal.style.display = "none";
	}
	if (event.target === registerModal) {
		registerModal.style.display = "none";
	}
});
