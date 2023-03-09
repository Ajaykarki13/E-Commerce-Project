
let form = document.querySelector(".signup");
let users = [];
let name = document.querySelector("#name");
let email = document.querySelector("#email");
let password = document.querySelector("#pass");
let confirm = document.querySelector("#confirm");

form.addEventListener("submit", validateForm);

function validateForm(e) {
  e.preventDefault();
  let data = {};
  if (password.value != confirm.value) {
    alert("password not matched");
  } else if (password.value == confirm.value) {
    data = { Email: email.value, Password: password.value, Name: name.value };
    console.log(data);
  }

  const existingusers = localStorage.getItem("userinfo"); // checking if there is existing user
  console.log(existingusers);

  if (existingusers) {
    //if yes parse it and store in users array
    users = JSON.parse(localStorage.getItem("userinfo"));
    console.log(users);

    let checkuser = users.filter((x) => {
      return x.Email === email.value;
    });
    if (checkuser.length == 0) {
     
      users.push(data);
      console.log(users);
    } else {
      document.getElementById("error-message").innerText =
        "user with this email already exists";
    }
  } else {
    //if no
    users = [data];
    console.log(users);
  }

  localStorage.setItem("userinfo", JSON.stringify(users));
  window.location.href = "../login/login.html";
}
