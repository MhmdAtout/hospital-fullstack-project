const fill_name = document.getElementById("fill_name");

const available_services = document.getElementById("available_services");
const request_service_btn = document.getElementById("request_service_btn");
const user_services = document.getElementById("user_services");

const available_medication = document.getElementById("available_medication");
const medication_btn = document.getElementById("medication_btn");

const updateuser_msg = document.getElementById("updateuser_msg");

const edit_profile_btn = document.getElementById("edit_profile_btn");
const name_input = document.getElementById("name_input");
const email_input = document.getElementById("email_input");
const dob_input = document.getElementById("dob_input");
var toggle = true;

const baseURL = "http://localhost/hospital-fullstack-project/backend";
const user_id = localStorage.getItem("id");

const home_icon = document.getElementById("home_icon");
const profile_icon = document.getElementById("profile_icon");
const logout_icon = document.getElementById("logout_icon");

const home_page = document.getElementById("home_page");
const profile_page = document.getElementById("profile_page");

home_icon.addEventListener("click", () => {
  home_page.classList.remove("hide");
  home_page.classList.add("flex");
  profile_page.classList.remove("flex");
  profile_page.classList.add("hide");
});
profile_icon.addEventListener("click", () => {
  profile_page.classList.remove("hide");
  profile_page.classList.add("flex");
  home_page.classList.remove("flex");
  home_page.classList.add("hide");
});
logout_icon.addEventListener("click", () => {
  localStorage.clear();
  window.location.href = "../index.html";
});

axios({
  method: "get",
  url: `${baseURL}/get_user.php?id=${user_id}`,
}).then((res) => {
  console.log(res.data);
  fill_name.innerText = res.data.user.name;
});

axios({
  method: "get",
  url: `${baseURL}/get_services.php`,
}).then((res) => {
  services = res.data.services;

  services.forEach((service) => {
    const option = document.createElement("option");
    option.value = service.id;
    option.text = `${service.title}, $${service.cost}`;

    available_services.append(option);
  });
});

request_service_btn.addEventListener("click", () => {
  let service_data = new FormData();
  let service_id = available_services.value;
  service_data.append("user_id", user_id);
  service_data.append("service_id", service_id);
  axios({
    method: "post",
    url: `${baseURL}/request_service.php`,
    data: service_data,
  }).then((res) => {
    console.log(res.data);
  });
});

axios({
  method: "get",
  url: `${baseURL}/get_user_services.php?user_id=${user_id}`,
}).then((res) => {
  let services = res.data.services;
  console.log(services);
  services.forEach((service) => {
    user_services.innerHTML += `
      <p>${service.title}, ${service.status}</p>`;
  });
});

axios({
  method: "get",
  url: `${baseURL}/get_medication.php`,
}).then((res) => {
  let medications = res.data.medications;

  medications.forEach((medication) => {
    const option = document.createElement("option");
    option.value = medication.id;
    option.text = `${medication.name}, $${medication.cost}`;

    available_medication.append(option);
  });
});

medication_btn.addEventListener("click", () => {
  let mdx_data = new FormData();
  let mdx_id = available_medication.value;
  mdx_data.append("user_id", user_id);
  mdx_data.append("medication_id", mdx_id);
  axios({
    method: "post",
    url: `${baseURL}/request_medication.php`,
    data: mdx_data,
  }).then((res) => {
    console.log(res.data);
  });
});

edit_profile_btn.addEventListener("click", () => {
  if (toggle) {
    name_input.removeAttribute("disabled");
    email_input.removeAttribute("disabled");
    dob_input.removeAttribute("disabled");
    edit_profile_btn.innerHTML = "Save";
    updateuser_msg.innerText = "";
    toggle = false;
  } else {
    name_input.setAttribute("disabled", null);
    email_input.setAttribute("disabled", null);
    dob_input.setAttribute("disabled", null);
    edit_profile_btn.innerHTML = "Edit";
    toggle = true;

    let profile_data = new FormData();
    profile_data.append("id", user_id);
    profile_data.append("name", name_input.value);
    profile_data.append("email", email_input.value);
    profile_data.append("dob", dob_input.value);

    if (name_input.value != "" && email_input.value != "" && dob_input != "") {
      axios({
        method: "post",
        url: `${baseURL}/edit_profile.php`,
        data: profile_data,
      }).then((res) => {
        console.log(res.data);
        updateuser_msg.innerText = res.data.status;
      });
    } else {
      updateuser_msg.innerText = "Please fill all inputs";
    }
  }
});
