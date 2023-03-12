const signin_btn = document.getElementById("signin_btn");
const home_btn = document.getElementById("home_btn");
const home_page = document.getElementById("home_page");
const signin_page = document.getElementById("signin_page");

const email = document.getElementById("email");
const password = document.getElementById("password");
const login_btn = document.getElementById("login_btn");

signin_btn.addEventListener("click", () => {
  home_page.classList.remove("flex");
  home_page.classList.add("hide");
  signin_page.classList.remove("hide");
  signin_page.classList.add("flex");
});

home_btn.addEventListener("click", () => {
  signin_page.classList.remove("flex");
  signin_page.classList.add("hide");
  home_page.classList.remove("hide");
  home_page.classList.add("flex");
});
