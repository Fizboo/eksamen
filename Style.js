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
    body {
      font-family: var(--font-family);
      display: flex;
      flex-direction: column;
      height: 100vh;
      overflow: hidden;
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
  `;

	const styleSheet = document.createElement("style");
	styleSheet.type = "text/css";
	styleSheet.innerText = globalStyles;
	document.head.appendChild(styleSheet);

	const headerStyles = {
		backgroundColor: "var(--color-primary)",
		color: "#fff",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		textAlign: "center",
		padding: "20px",
	};

	const logoStyles = {
		width: "100px",
		height: "auto",
	};

	const titleStyles = {
		margin: "10px 0",
		fontSize: "2rem",
	};

	const elementsToStyle = [
		{ selector: "header", styles: headerStyles },
		{ selector: "header img", styles: logoStyles },
		{ selector: "header h1", styles: titleStyles },
	];

	for (const { selector, styles } of elementsToStyle) {
		const elements = document.querySelectorAll(selector);
		for (const element of elements) {
			applyStyles(element, styles);
		}
	}
});
