const home_page = document.getElementById("page-content");
const profile_page = document.getElementById("profile_page");
const baseURL = "http://localhost/hospital-fullstack-project/backend";
const user_id = localStorage.getItem("id");

home_icon.addEventListener("click", () => {
  home_page.classList.add("flex");
  home_page.classList.remove("hide");
  profile_page.classList.add("hide");
  profile_page.classList.remove("flex");
});
profile_icon.addEventListener("click", () => {
  profile_page.classList.add("flex");
  profile_page.classList.remove("hide");
  home_page.classList.add("hide");
  home_page.classList.remove("flex");
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

const edit_profile_btn = document.getElementById("edit_profile_btn");
const name_input = document.getElementById("name_input");
const email_input = document.getElementById("email_input");
const dob_input = document.getElementById("dob_input");

var toggle = true;

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

axios({
  method: "get",
  url: `${baseURL}/get_patients.php`,
}).then((res) => {
  patients = res.data.users;
  console.log(patients);

  patients.forEach((patient) => {
    const option = document.createElement("option");
    option.value = patient.id;
    option.text = patient.name;

    patient_to_assign.append(option);
  });
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
  service_data.append("user_id", patient_to_assign.value);
  service_data.append("service_id", service_id);
  axios({
    method: "post",
    url: `${baseURL}/add_service_byemployee.php`,
    data: service_data,
  }).then((res) => {
    console.log(res.data);
  });
});
