"use strict";

const loginModal = document.querySelector("#loginModal");
const registerModal = document.querySelector("#registerModal");
const loginBtn = document.querySelector("#loginBtn");
const registerBtn = document.querySelector("#registerBtn");
const loginClose = loginModal.querySelector(".close");
const registerClose = registerModal.querySelector(".close");

loginBtn.addEventListener("click", function () {
  loginModal.style.display = "block";
});

registerBtn.addEventListener("click", function () {
  registerModal.style.display = "block";
});

loginClose.addEventListener("click", function () {
  loginModal.style.display = "none";
});

registerClose.addEventListener("click", function () {
  registerModal.style.display = "none";
});

window.addEventListener("click", function (event) {
  if (event.target == loginModal) {
    loginModal.style.display = "none";
  }
  if (event.target == registerModal) {
    registerModal.style.display = "none";
  }
});

const registerForm = document.querySelector("#registerForm");

registerForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const name = document.querySelector("#name").value;
  const phone = document.querySelector("#phone").value;
  const username = document.querySelector("#username").value;
  const password = document.querySelector("#password").value;

  if (!name || !phone || !username || !password) {
    alert("Alle feltene må fylles ut!");
  } else {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const userExists = users.some(function (user) {
      return user.username === username;
    });

    if (userExists) {
      alert(
        "Brukernavnet er allerede i bruk. Vennligst velg et annet brukernavn."
      );
    } else {
      const newUser = {
        name: name,
        phone: phone,
        username: username,
        password: password,
      };
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));

      document.querySelector("#name").value = "";
      document.querySelector("#phone").value = "";
      document.querySelector("#username").value = "";
      document.querySelector("#password").value = "";

      alert("Registrering godkjent!");

      registerModal.style.display = "none";
      loginModal.style.display = "block";
    }
  }
});

const loginForm = document.querySelector("#loginForm");

loginForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const username = document.querySelector("#loginUsername").value;
  const password = document.querySelector("#loginPassword").value;

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const user = users.find(function (user) {
    return user.username === username && user.password === password;
  });

  if (user) {
    document.querySelector("#loginUsername").value = "";
    document.querySelector("#loginPassword").value = "";

    alert("Velkommen, " + user.name + "!");

    window.location.href = "/App.html";
  } else {
    alert("Feil brukernavn eller passord!");
  }
});
// Slider

const slides = document.querySelectorAll(".slide");

slides.forEach((slide, indx) => {
  slide.style.transform = `translateX(${indx * 100}%)`;
});

// select next slide button
const nextSlide = document.querySelector(".btn-next");

// current slide counter
let curSlide = 0;

let maxSlide = slides.length - 1;

nextSlide.addEventListener("click", function () {
  if (curSlide === maxSlide) {
    curSlide = 0;
  } else {
    curSlide++;
  }

  slides.forEach((slide, indx) => {
    slide.style.transform = `translateX(${100 * (indx - curSlide)}%)`;
  });
});

// select next slide button
const prevSlide = document.querySelector(".btn-prev");

prevSlide.addEventListener("click", function () {
  if (curSlide === 0) {
    curSlide = maxSlide;
  } else {
    curSlide--;
  }
  slides.forEach((slide, indx) => {
    slide.style.transform = `translateX(${100 * (indx - curSlide)}%)`;
  });
});
