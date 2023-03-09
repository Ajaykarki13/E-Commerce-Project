let form = document.querySelector(".login");
    let currentUser = [];

    let email = document.querySelector("#email");
    let password = document.querySelector("#pass");

    let data = JSON.parse(localStorage.getItem("userinfo"));
    console.log(data);

    // LOGIN AND DIRECTING TO DASHBOARD PAGE

    form.addEventListener("submit", dashPage);

    function dashPage(e) {
      e.preventDefault();
      //data = JSON.parse(localStorage.getItem(userinfo))
      let current = data.filter((x)=>{ return x.Email==email.value})
      console.log(current)
      if((current.length>0 && current.length<2)&&(current[0].Email==email.value && current[0].Password==password.value))
       {
        let tokenNumber = token(); //CALLING TOKEN GENERATING FUNCTION

        //CURRENT USER

        newobj = {
          Email: current[0].Email,
          Password: current[0].Password,
          Name: current[0].Name,
          token: tokenNumber,
        };
        currentUser.push(newobj);
        console.log(currentUser);
        localStorage.setItem("newdata", JSON.stringify(currentUser));
        window.location.href = "../shop/shop.html";
      }
      else{alert('wrong credentials') ;}
    }
  //}
    //GENERATING TOKEN

    function token() {
      let char =
        "qwertyuiopasdfghjklzxcvbnm123xf6RrEbBm9tRArgt35J5kfGEcq9opRPOIUYTRQWE";
      let randomtoken = "";
      for (let i = 0; i < 16; i++) {
        let random = Math.floor(Math.random() * char.length);
        randomtoken += char[random];
      }
      return randomtoken;
    }