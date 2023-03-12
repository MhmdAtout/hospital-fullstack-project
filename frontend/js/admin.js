const users_to_assign = document.getElementById("users_to_assign");
const hospital_toassign_to = document.getElementById("hospital_toassign_to");

const baseURL = "http://localhost/hospital-fullstack-project/backend";

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
