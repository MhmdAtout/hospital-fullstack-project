const patient_to_assign = document.getElementById("patient_to_assign");
const employee_to_assign = document.getElementById("employee_to_assign");
const hospital_toassign_to = document.querySelectorAll(".hospital_toassign_to");
const assign_pt_btn = document.getElementById("assign_pt_btn");
const assign_employee_btn = document.getElementById("assign_employee_btn");
const requests_wrapper = document.getElementById("requests_wrapper");

const baseURL = "http://localhost/hospital-fullstack-project/backend";

const fill_name = document.getElementById("fill_name");
const user_id = localStorage.getItem("id");
axios({
  method: "get",
  url: `${baseURL}/get_user.php?id=${user_id}`,
}).then((res) => {
  console.log(res.data);
  fill_name.innerText = res.data.user.name;
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
  url: `${baseURL}/get_employees.php`,
}).then((res) => {
  employees = res.data.users;
  console.log(employees);

  employees.forEach((employee) => {
    const option = document.createElement("option");
    option.value = employee.id;
    option.text = employee.name;

    employee_to_assign.append(option);
  });
});

axios({
  method: "get",
  url: `${baseURL}/get_hospitals.php`,
}).then((res) => {
  hospitals = res.data.hospitals;

  hospital_toassign_to.forEach((element) => {
    hospitals.forEach((hospital) => {
      const option = document.createElement("option");
      option.value = hospital.id;
      option.text = hospital.name;

      element.append(option);
    });
  });
});

assign_pt_btn.addEventListener("click", () => {
  let patient_data = new FormData();
  let hospitals_id = hospital_toassign_to[0].value;
  patient_data.append("user_id", patient_to_assign.value);
  patient_data.append("hospital_id", hospitals_id);
  axios({
    method: "post",
    url: `${baseURL}/join_patient.php`,
    data: patient_data,
    headers: {
      Authorization: localStorage.getItem("access_token"),
    },
  })
    .then((res) => {
      console.log(res.data);
    })
    .catch((e) => {
      if (e.response.status === 401) {
        alert("Unauthorized");
        localStorage.clear();
        window.location.href = "../index.html";
      }
    });
});

assign_employee_btn.addEventListener("click", () => {
  let employee_data = new FormData();
  let hospitals_id = hospital_toassign_to[1].value;
  employee_data.append("user_id", employee_to_assign.value);
  employee_data.append("hospital_id", hospitals_id);
  axios({
    method: "post",
    url: `${baseURL}/join_employee.php`,
    data: employee_data,
  }).then((res) => {
    console.log(res.data);
  });
});

axios({
  method: "get",
  url: `${baseURL}/get_users_requests.php`,
}).then((res) => {
  let requests = res.data.requests;
  console.log(requests);
  requests.forEach((request) => {
    requests_wrapper.innerHTML += `
            <div class="each-request">
              <div class="pt-name">
                <p class="regular txt-black">${request.name}</p>
              </div>
              <div class="service regular txt-black">
                <p>${request.title}</p>
              </div>
              <div class="buttons">
                <button value="${request.user_id} ${request.service_id}" class="bold filled bg-blue btn accept_request_btn">Accept</button>
                <button value="${request.user_id} ${request.service_id}}" class="bold filled bg-blue btn reject_request_btn">Reject</button>
              </div>
            </div>
              `;
  });

  const accept_request_btn = document.querySelectorAll(".accept_request_btn");
  const reject_request_btn = document.querySelectorAll(".reject_request_btn");

  accept_request_btn.forEach((button) => {
    let request_data = new FormData();
    const values = button.value.split(" ");
    const user_id = values[0];
    const service_id = values[1];
    request_data.append("user_id", user_id);
    request_data.append("service_id", service_id);

    button.addEventListener("click", () => {
      axios({
        method: "post",
        url: `${baseURL}/accept_service.php`,
        data: request_data,
      }).then((res) => {
        console.log(res.data);
      });
    });
  });

  reject_request_btn.forEach((button) => {
    let request_data = new FormData();
    const values = button.value.split(" ");
    const user_id = values[0];
    const service_id = values[1];
    request_data.append("user_id", user_id);
    request_data.append("service_id", service_id);

    button.addEventListener("click", () => {
      axios({
        method: "post",
        url: `${baseURL}/reject_service.php`,
        data: request_data,
      }).then((res) => {
        console.log(res.data);
      });
    });
  });
});

const logout_icon = document.getElementById("logout_icon");
const home_icon = document.getElementById("home_icon");
const profile_icon = document.getElementById("profile_icon");

const home_page = document.getElementById("home_page");
const profile_page = document.getElementById("profile_page");
console.log(home_page);
console.log(profile_page);

home_icon.addEventListener("click", () => {
  home_page.classList.remove("hide");
  home_page.classList.add("flex");
  profile_page.classList.remove("flex");
  profile_page.classList.add("hide");
});
profile_icon.addEventListener("click", () => {
  home_page.classList.remove("flex");
  home_page.classList.add("hide");
  profile_page.classList.remove("hide");
  profile_page.classList.add("flex");
});

logout_icon.addEventListener("click", () => {
  localStorage.clear();
  window.location.href = "../index.html";
});

const add_fullname = document.getElementById("add_fullname");
const add_email = document.getElementById("add_email");
const add_password = document.getElementById("add_password");
const add_dob = document.getElementById("add_dob");
const add_gender = document.getElementById("add_gender");
const add_usertype = document.getElementById("add_usertype");

axios({
  method: "get",
  url: `${baseURL}/get_usertypes.php`,
}).then((res) => {
  usertypes = res.data.users;
  console.log(usertypes);

  usertypes.forEach((type) => {
    const option = document.createElement("option");
    option.value = type.id;
    option.text = type.type;

    add_usertype.append(option);
  });
});

const add_user_btn = document.getElementById("add_user_btn");

add_user_btn.addEventListener("click", () => {
  const add_fullname = document.getElementById("add_fullname");
  const add_email = document.getElementById("add_email");
  const add_password = document.getElementById("add_password");
  const add_dob = document.getElementById("add_dob");
  const add_gender = document.getElementById("add_gender");
  const add_usertype = document.getElementById("add_usertype");
  const result = document.getElementById("result");

  if (
    add_fullname.value == "" &&
    add_email.value == "" &&
    add_password.value == "" &&
    add_password.value == "" &&
    add_dob.value == "" &&
    add_gender.value == ""
  ) {
    result.innerText = "Please fill all the blanks";
  } else {
    let signup_data = new FormData();
    signup_data.append("name", add_fullname.value);
    signup_data.append("email", add_email.value);
    signup_data.append("password", add_password.value);
    signup_data.append("dob", add_dob.value);
    signup_data.append("gender", add_gender.value);
    signup_data.append("usertype_id", add_usertype.value);

    axios({
      method: "post",
      url: `${baseURL}/add_user.php`,
      data: signup_data,
    }).then((res) => {
      console.log(res.data);
      result.innerText = res.data.status;
    });
  }
});
