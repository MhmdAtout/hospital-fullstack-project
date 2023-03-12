const patient_to_assign = document.getElementById("patient_to_assign");
const employee_to_assign = document.getElementById("employee_to_assign");
const hospital_toassign_to = document.querySelectorAll(".hospital_toassign_to");
console.log(hospital_toassign_to);
const assign_pt_btn = document.getElementById("assign_pt_btn");
const assign_employee_btn = document.getElementById("assign_employee_btn");
const requests_wrapper = document.getElementById("requests_wrapper");

const baseURL = "http://localhost/hospital-fullstack-project/backend";

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
  }).then((res) => {
    console.log(res.data);
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
              <div class="pt-name">
                <p>${request.name}</p>
              </div>
              <div class="service">
                <p>${request.title}</p>
              </div>
              <div class="buttons">
                <button id="accept_request_btn">Accept</button>
                <button id="reject_request_btn">Reject</button>
              </div>
      `;
  });
});
