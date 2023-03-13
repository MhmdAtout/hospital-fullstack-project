const signin_btn = document.getElementById("signin_btn");
const home_btn = document.getElementById("home_btn");
const home_page = document.getElementById("home_page");
const signin_page = document.getElementById("signin_page");

const login_btn = document.getElementById("login_btn");

const error_msg = document.getElementById("error_msg");

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
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const signin_body = new FormData();
  signin_body.append("email", email.value);
  signin_body.append("password", password.value);

  axios({
    method: "post",
    url: `${baseURL}/signin.php`,
    data: signin_body,
  }).then((res) => {
    console.log(res.data);
    localStorage.setItem("id", res.data.id);
    localStorage.setItem("access_token", res.data.access_token);
    if (res.data.user_type == 3) {
      window.location.href = "./pages/patient.html";
    } else if (res.data.user_type == 2) {
      window.location.href = "./pages/employee.html";
    } else if (res.data.user_type == 1) {
      window.location.href = "./pages/admin.html";
    } else {
      error_msg.innerText = res.data.message;
    }
  });
});
