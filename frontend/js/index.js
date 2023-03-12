const signin_btn = document.getElementById("signin_btn");
const home_btn = document.getElementById("home_btn");
const home_page = document.getElementById("home_page");
const signin_page = document.getElementById("signin_page");

const email = document.getElementById("email");
const password = document.getElementById("password");
const login_btn = document.getElementById("login_btn");

const baseURL = "http://localhost/hospital-fullstack-project/backend";

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

login_btn.addEventListener("click", () => {
  const signin_body = new FormData();
  signin_body.append("email", email.value);
  signin_body.append("password", password.value);

  axios({
    method: "post",
    url: `${baseURL}/signin.php`,
    data: signin_body,
  }).then((res) => {
    console.log(res.data);
    if (res.data.user_type == 3) {
      window.location.href = "./pages/patient.html";
      localStorage.setItem("id", res.data.id);
    } else if (res.data.user_type == 2) {
      window.location.href = "./pages/employee.html";
      localStorage.setItem("id", res.data.id);
    } else {
      window.location.href = "./pages/admin.html";
      localStorage.setItem("id", res.data.id);
    }
  });
});
