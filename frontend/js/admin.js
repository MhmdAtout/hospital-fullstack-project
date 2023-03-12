const patient_to_assign = document.getElementById("patient_to_assign");
const employee_to_assign = document.getElementById("employee_to_assign");
const hospital_toassign_to = document.getElementById("hospital_toassign_to");

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
    option.text = `${patient.name}`;

    patient_to_assign.append(option);
  });
});
