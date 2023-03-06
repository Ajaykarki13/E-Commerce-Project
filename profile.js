let form = document.querySelector(".dash");
    // let btn1 = document.querySelector("#change")
    let btn2 = document.querySelector("#logout");

    let oldpass = document.querySelector("#pass1");
    let newpass = document.querySelector("#pass2");
    let confpass = document.querySelector("#pass3");

    let data = JSON.parse(localStorage.getItem("newdata"));
    console.log(data);

   
    let user = document.querySelector(".users");
    user.value = data[0].Name;

    //change password

    form.addEventListener("submit", changePassword);
    function changePassword(e) {
      e.preventDefault();
      if (( oldpass.value == data[0].Password &&newpass.value == confpass.value)&&(oldpass.value!=newpass.value)) {
        data[0].Password = newpass.value;
        
        localStorage.setItem('newdata',JSON.stringify(data))

        //editing the userinfo
        
let userinfo = JSON.parse(localStorage.getItem("userinfo"));
console.log('userinfo')

var allUsersExceptCurrent = userinfo.filter((x) =>{return  x.Email != data[0].Email});

let userwithNewPassword = {Email : data[0].Email,Password:data[0].Password,Name:data[0].Name} 

allUsersExceptCurrent.push(userwithNewPassword);

localStorage.setItem("userinfo", JSON.stringify(allUsersExceptCurrent));

        alert("Password changed");
        console.log(allUsersExceptCurrent)
      } else if (
        oldpass.value != data[0].Password ||
        newpass.value != confpass.value || oldpass.value == newpass.value
      ) {
        alert("wrong password");
      }
    }

    //LOGOUT

    btn2.addEventListener("click", logoutUser);
    function logoutUser() {

      window.localStorage.removeItem("newdata");
      // window.localStorage.removeItem("userinfo");
      // window.localStorage.clear();
      window.location.href = "./index.html";
    }