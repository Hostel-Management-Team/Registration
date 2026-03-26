const form = document.getElementById("form");
const errorMsg = document.getElementById("errorMsg");

form.addEventListener("submit", function(e) {
  e.preventDefault();

  let firstName = document.getElementById("firstName").value.trim();
  let lastName = document.getElementById("lastName").value.trim();
  let phone = document.getElementById("phone").value.trim();
  let hostel = document.getElementById("hostel").value.trim();
  let room = document.getElementById("room").value.trim();
  let gender = document.querySelector('input[name="gender"]:checked');
  let countryCode = document.getElementById("countryCode").value;

  if (!firstName || !lastName || !phone || !hostel || !room || !gender) {
    errorMsg.innerText = "All fields are required!";
    return;
  }

  if (!/^[A-Za-z]+$/.test(firstName) || !/^[A-Za-z]+$/.test(lastName)) {
    errorMsg.innerText = "Names must contain only letters!";
    return;
  }

  if (!/^[0-9]{7,15}$/.test(phone)) {
    errorMsg.innerText = "Enter valid phone number!";
    return;
  }

  errorMsg.innerText = "";

  localStorage.setItem("step2Data", JSON.stringify({
    firstName,
    lastName,
    phone,
    countryCode,
    hostel,
    room,
    gender: gender.value
  }));

  window.location.href = "step3.html";
});

function goBack() {
  window.location.href = "step1.html";
}

window.onload = function() {
  let data = JSON.parse(localStorage.getItem("step2Data"));

  if (data) {
    document.getElementById("firstName").value = data.firstName || "";
    document.getElementById("lastName").value = data.lastName || "";
    document.getElementById("phone").value = data.phone || "";
    document.getElementById("hostel").value = data.hostel || "";
    document.getElementById("room").value = data.room || "";

    if (data.countryCode) {
      document.getElementById("countryCode").value = data.countryCode;
    }

    if (data.gender) {
      let genderInput = document.querySelector(`input[value="${data.gender}"]`);
      if (genderInput) genderInput.checked = true;
    }
  }
};