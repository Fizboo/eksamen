const url = "https://randomuser.me/api/";
const users = [];
let currentIndex = 0;
const friends = JSON.parse(localStorage.getItem("friends")) || [];

const generateWorkoutLog = (user) => {
	const workouts = [
		{ type: "running", distance: "5 km", duration: "30 minutes" },
		{ type: "cycling", distance: "20 km", duration: "45 minutes" },
		{ type: "running", distance: "10 km", duration: "60 minutes" },
	];

	const workout = workouts[Math.floor(Math.random() * workouts.length)];
	return {
		user: `${user.name.first} ${user.name.last}`,
		type: workout.type,
		distance: workout.distance,
		duration: workout.duration,
	};
};

const getUser = () => {
	fetch(url)
		.then((response) => response.json())
		.then((data) => {
			const user = data.results[0];
			const workoutLog = generateWorkoutLog(user);
			users.push(user);
			currentIndex = users.length - 1;
			updateUser(user, workoutLog);
		});
};

const updateUser = (user, workoutLog) => {
	document.querySelector("#user__image").src = user.picture.large;
	document.querySelector("#user__fullname").textContent =
		`${user.name.first} ${user.name.last}`;
	document.querySelector("#user__phone").textContent = user.phone;
	document.querySelector("#user__email").textContent = user.email;
	document.querySelector("#workout__type").textContent = workoutLog.type;
	document.querySelector("#workout__distance").textContent =
		workoutLog.distance;
	document.querySelector("#workout__duration").textContent =
		workoutLog.duration;
};

const addFriend = () => {
	const user = users[currentIndex];
	friends.push(user);
	localStorage.setItem("friends", JSON.stringify(friends));
	alert(`${user.name.first} ${user.name.last} ble lagt til i vennelisten din!`);
};

const showFriends = () => {
	if (friends.length === 0) {
		alert("Du har ingen venner i din venneliste.");
		return;
	}
	const modal = document.createElement("div");
	modal.classList.add("modal");
	const modalContent = document.createElement("div");
	modalContent.classList.add("modal-content");
	const closeBtn = document.createElement("span");
	closeBtn.classList.add("close-btn");
	closeBtn.textContent = "x";
	closeBtn.addEventListener("click", () => modal.remove());
	modalContent.appendChild(closeBtn);
	friends.slice(0, 5).forEach((friend, index) => {
		const friendElement = document.createElement("div");
		friendElement.classList.add("friend");
		const friendImage = document.createElement("img");
		friendImage.src = friend.picture.medium;
		friendElement.appendChild(friendImage);
		const friendName = document.createElement("p");
		friendName.textContent = `${friend.name.first} ${friend.name.last}`;
		friendElement.appendChild(friendName);
		const deleteBtn = document.createElement("button");
		deleteBtn.textContent = "Slett";
		deleteBtn.addEventListener("click", () => {
			friends.splice(index, 1);
			localStorage.setItem("friends", JSON.stringify(friends));
			modal.remove();
			showFriends();
		});
		friendElement.appendChild(deleteBtn);
		modalContent.appendChild(friendElement);
	});
	modal.appendChild(modalContent);
	document.body.appendChild(modal);
};

document.getElementById("next__user--btn").addEventListener("click", getUser);
document.getElementById("prev__user--btn").addEventListener("click", () => {
	if (currentIndex > 0) {
		currentIndex--;
		const user = users[currentIndex];
		const workoutLog = generateWorkoutLog(user);
		updateUser(user, workoutLog);
	}
});
document
	.getElementById("add__friend--btn")
	.addEventListener("click", addFriend);
document.getElementById("friends").addEventListener("click", showFriends);

getUser();
