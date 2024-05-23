document.addEventListener("DOMContentLoaded", () => {
	const applyStyles = (element, styles) => {
		for (const [property, value] of Object.entries(styles)) {
			element.style[property] = value;
		}
	};

	const globalStyles = `
		* {
			margin: 0;
			padding: 0;
			box-sizing: border-box;
		}
		:root {
			--color-primary: #1f444b;
			--color-secondary: #4caf50;
			--color-light: #e6e6e6;
			--color-dark: #333;
			--font-family: 'Arial', sans-serif;
		}
		body, html {
			overflow: hidden;
			height: 100%;
			font-family: var(--font-family);
		}
		button {
			font-size: 1rem;
			padding: 10px 20px;
			border: none;
			border-radius: 5px;
			cursor: pointer;
		}
		button:hover {
			opacity: 0.9;
		}
		header {
			background-color: var(--color-primary);
			color: #fff;
			text-align: center;
			padding: 20px;
			position: relative;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 120px;
		}
		header img {
			position: absolute;
			left: 20px;
			height: 80px;
			top: 50%;
			transform: translateY(-50%);
		}
		.header-login-btn {
			position: absolute;
			right: 20px;
			top: 50%;
			transform: translateY(-50%);
			background-color: var(--color-secondary);
			color: #fff;
			border: none;
			padding: 10px 20px;
			cursor: pointer;
			border-radius: 8px;
			font-size: 1rem;
		}
		.header-login-btn:hover {
			background-color: #45a049;
		}
		main {
			display: flex;
			justify-content: center;
			align-items: center;
			height: calc(100vh - 60px);
			position: relative;
		}
		.background-image {
			background-image: url('../Assets/cycling_Mountain.jpg');
			background-size: cover;
			background-position: center;
			width: 100%;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.rolling-text {
			position: absolute;
			top: 30%;
			width: 100%;
			text-align: center;
			color: black;
			font-size: 1.5rem;
			animation: rollingText 20s linear infinite;
		}
		@keyframes rollingText {
			from {
				transform: translateX(60%);
			}
			to {
				transform: translateX(-100%);
			}
		}
		footer {
			background-color: var(--color-primary);
			color: #fff;
			text-align: center;
			padding: 10px;
			position: fixed;
			bottom: 0;
			width: 100%;
		}
	`;

	const styleSheet = document.createElement("style");
	styleSheet.type = "text/css";
	styleSheet.innerText = globalStyles;
	document.head.appendChild(styleSheet);

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
});
