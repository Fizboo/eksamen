document.addEventListener("DOMContentLoaded", () => {
	const loginModal = document.querySelector("#loginModal");
	const registerModal = document.querySelector("#registerModal");
	const headerLoginBtn = document.querySelector("#headerLoginBtn");
	const showRegister = document.querySelector("#showRegister");
	const loginForm = document.querySelector("#loginForm");
	const registerForm = document.querySelector("#registerForm");

	const applyStyles = (element, styles) => {
		for (const [property, value] of Object.entries(styles)) {
			element.style[property] = value;
		}
	};

	const commonModalStyles = {
		backgroundColor: "rgba(0, 0, 0, 0.3)",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		position: "fixed",
		top: "0",
		left: "0",
		width: "100%",
		height: "100%",
		zIndex: "1000",
	};

	const commonModalContentStyles = {
		backgroundColor: "rgba(255, 255, 255, 0.7)",
		padding: "30px",
		borderRadius: "10px",
		border: "1px solid #ccc",
		boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
		width: "500px",
		textAlign: "center",
		position: "relative",
	};

	const closeBtnStyles = {
		position: "absolute",
		top: "10px",
		right: "10px",
		backgroundColor: "red",
		color: "#fff",
		border: "none",
		padding: "5px 10px",
		borderRadius: "50%",
		cursor: "pointer",
	};

	const inputStyles = {
		padding: "12px",
		marginBottom: "10px",
		border: "1px solid #ccc",
		borderRadius: "8px",
		width: "calc(100% - 24px)",
		boxShadow: "inset 0 1px 3px rgba(0,0,0,0.2)",
	};

	const submitBtnStyles = {
		backgroundColor: "var(--color-secondary)",
		color: "white",
		border: "none",
		padding: "12px 20px",
		cursor: "pointer",
		borderRadius: "8px",
		fontSize: "1rem",
		transition: "background-color 0.3s",
		marginTop: "20px",
		width: "100%",
	};

	applyStyles(loginModal, commonModalStyles);
	applyStyles(registerModal, commonModalStyles);

	const modalContents = document.querySelectorAll(".modal-content");
	for (const modalContent of modalContents) {
		applyStyles(modalContent, commonModalContentStyles);
	}

	const closeButtons = document.querySelectorAll(".close");
	for (const closeBtn of closeButtons) {
		applyStyles(closeBtn, closeBtnStyles);
	}

	const inputs = document.querySelectorAll(
		'.modal-content input[type="text"], .modal-content input[type="password"]',
	);
	for (const input of inputs) {
		applyStyles(input, inputStyles);
	}

	const submitButtons = document.querySelectorAll(
		'.modal-content input[type="submit"]',
	);
	for (const submitBtn of submitButtons) {
		applyStyles(submitBtn, submitBtnStyles);
	}

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
			loginForm.reset();
			sessionStorage.setItem("loggedInUser", username);
			window.location.href = "../ProfilePage/ProfilePage.html";
		} else {
			alert("Feil brukernavn eller passord. Vennligst prøv igjen.");
		}
	});

	for (const closeBtn of closeButtons) {
		closeBtn.addEventListener("click", () => {
			const modal = closeBtn.closest(".modal");
			modal.style.display = "none";
		});
	}
});
