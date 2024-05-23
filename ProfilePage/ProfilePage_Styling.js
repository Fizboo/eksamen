document.addEventListener("DOMContentLoaded", () => {
	const applyStyles = (element, styles) => {
		for (const [property, value] of Object.entries(styles)) {
			element.style[property] = value;
		}
	};

	const headerStyles = {
		backgroundColor: "var(--color-primary)",
		color: "#fff",
		display: "flex",
		alignItems: "center",
		padding: "20px",
		justifyContent: "space-between",
	};

	const logoStyles = {
		height: "80px",
	};

	const titleStyles = {
		textAlign: "center",
		margin: "0",
	};

	const headerLogoutBtnStyles = {
		backgroundColor: "red",
		color: "#fff",
		border: "none",
		padding: "10px 20px",
		cursor: "pointer",
		borderRadius: "5px",
		fontSize: "1rem",
	};

	const headerLogoutBtnHoverStyles = {
		backgroundColor: "darkred",
	};

	const gridContainerStyles = {
		display: "grid",
		gridTemplateColumns: "1fr 1fr",
		gap: "20px",
		padding: "20px",
		height: "calc(100vh - 160px)",
		overflow: "hidden",
	};

	const columnStyles = {
		display: "flex",
		flexDirection: "column",
		gap: "20px",
		overflow: "hidden",
	};

	const sectionStyles = {
		backgroundColor: "#f8f8f8",
		padding: "20px",
		borderRadius: "10px",
		boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
	};

	const sectionTitleStyles = {
		color: "var(--color-dark)",
		fontFamily: "var(--font-family)",
	};

	const listItemStyles = {
		backgroundColor: "var(--color-light)",
		marginBottom: "10px",
		padding: "15px",
		borderRadius: "8px",
		boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
	};

	const coordinatesStyles = {
		fontSize: "0.8rem",
		color: "var(--color-dark)",
		marginLeft: "10px",
		cursor: "pointer",
	};

	const coordinatesHoverStyles = {
		textDecoration: "underline",
	};

	const deleteBtnStyles = {
		backgroundColor: "red",
		color: "white",
		border: "none",
		padding: "5px 10px",
		borderRadius: "5px",
		cursor: "pointer",
	};

	const deleteBtnHoverStyles = {
		backgroundColor: "darkred",
	};

	const mapStyles = {
		width: "100%",
		height: "600px",
		marginBottom: "10px",
	};

	const mapActionsStyles = {
		display: "flex",
		justifyContent: "center",
	};

	const actionBtnStyles = {
		backgroundColor: "var(--color-secondary)",
		color: "white",
		border: "none",
		padding: "12px",
		borderRadius: "8px",
		cursor: "pointer",
		fontSize: "1rem",
		width: "200px",
	};

	const actionBtnDisabledStyles = {
		backgroundColor: "#ddd",
		cursor: "not-allowed",
	};

	const actionBtnHoverEnabledStyles = {
		backgroundColor: "#45a049",
	};

	const modalStyles = {
		backgroundColor: "rgba(0, 0, 0, 0.3)",
		display: "none",
		alignItems: "center",
		justifyContent: "center",
		position: "fixed",
		top: "0",
		left: "0",
		width: "100%",
		height: "100%",
		zIndex: "1000",
	};

	const modalContentStyles = {
		backgroundColor: "rgba(255, 255, 255, 0.9)",
		padding: "30px",
		borderRadius: "15px",
		border: "1px solid #ccc",
		boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
		width: "auto",
		maxWidth: "500px",
		textAlign: "center",
		position: "relative",
		margin: "auto",
	};

	const modalInputStyles = {
		padding: "12px",
		marginBottom: "10px",
		border: "1px solid #ccc",
		borderRadius: "8px",
		width: "calc(100% - 24px)",
		boxShadow: "inset 0 1px 3px rgba(0,0,0,0.2)",
	};

	const closeModalBtnStyles = {
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

	const footerStyles = {
		backgroundColor: "var(--color-primary)",
		color: "#fff",
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		padding: "10px 20px",
		position: "relative",
	};

	const deleteUserBtnStyles = {
		backgroundColor: "red",
		color: "white",
		border: "none",
		padding: "10px 20px",
		borderRadius: "5px",
		cursor: "pointer",
	};

	const deleteUserBtnHoverStyles = {
		backgroundColor: "darkred",
	};

	const exerciseListStyles = {
		listStyleType: "none",
		padding: "0",
	};

	const addExerciseBtnStyles = {
		backgroundColor: "var(--color-secondary)",
		color: "white",
		border: "none",
		padding: "10px 20px",
		borderRadius: "5px",
		cursor: "pointer",
	};

	const addExerciseBtnHoverStyles = {
		backgroundColor: "#45a049",
	};

	const elementsToStyle = [
		{ selector: "header", styles: headerStyles },
		{ selector: ".logo", styles: logoStyles },
		{ selector: ".title", styles: titleStyles },
		{
			selector: ".header-logout-btn",
			styles: headerLogoutBtnStyles,
			hoverStyles: headerLogoutBtnHoverStyles,
		},
		{ selector: ".grid-container", styles: gridContainerStyles },
		{ selector: ".left-column", styles: columnStyles },
		{ selector: ".right-column", styles: columnStyles },
		{ selector: "section", styles: sectionStyles },
		{ selector: "section h2", styles: sectionTitleStyles },
		{ selector: "#exerciseList li", styles: listItemStyles },
		{ selector: "#exerciseList", styles: exerciseListStyles },
		{
			selector: ".coordinates",
			styles: coordinatesStyles,
			hoverStyles: coordinatesHoverStyles,
		},
		{
			selector: ".delete-btn",
			styles: deleteBtnStyles,
			hoverStyles: deleteBtnHoverStyles,
		},
		{ selector: "#map", styles: mapStyles },
		{ selector: ".map-actions", styles: mapActionsStyles },
		{
			selector: ".action-btn",
			styles: actionBtnStyles,
			disabledStyles: actionBtnDisabledStyles,
			hoverEnabledStyles: actionBtnHoverEnabledStyles,
		},
		{ selector: ".modal", styles: modalStyles },
		{ selector: ".modal-content", styles: modalContentStyles },
		{ selector: ".modal-content input[type='text']", styles: modalInputStyles },
		{
			selector: ".modal-content input[type='number']",
			styles: modalInputStyles,
		},
		{ selector: ".modal-content select", styles: modalInputStyles },
		{ selector: ".close", styles: closeModalBtnStyles },
		{ selector: "footer", styles: footerStyles },
		{
			selector: ".delete-user-btn",
			styles: deleteUserBtnStyles,
			hoverStyles: deleteUserBtnHoverStyles,
		},
		{
			selector: "#addExerciseButton",
			styles: addExerciseBtnStyles,
			hoverStyles: addExerciseBtnHoverStyles,
		},
	];

	for (const {
		selector,
		styles,
		hoverStyles,
		disabledStyles,
		hoverEnabledStyles,
	} of elementsToStyle) {
		const elements = document.querySelectorAll(selector);
		for (const element of elements) {
			applyStyles(element, styles);
			if (hoverStyles) {
				element.addEventListener("mouseenter", () =>
					applyStyles(element, hoverStyles),
				);
				element.addEventListener("mouseleave", () =>
					applyStyles(element, styles),
				);
			}
			if (disabledStyles && element.disabled) {
				applyStyles(element, disabledStyles);
			}
			if (hoverEnabledStyles && !element.disabled) {
				element.addEventListener("mouseenter", () =>
					applyStyles(element, hoverEnabledStyles),
				);
				element.addEventListener("mouseleave", () =>
					applyStyles(element, styles),
				);
			}
		}
	}
});
