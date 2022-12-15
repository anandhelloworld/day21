//creating parent section
let section = document.createElement("section");

//setting attribute
section.setAttribute("class", "wrapper");

//creating form inside section
section.innerHTML = `
  <div class="container mt-5">
    <div
      class="col-sm-8 offset-sm-2 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4 text-center" id="form-container"
    >
      <div class="logo my-5">
        <img src="./images/logo.png" class="img-fluid img_dim" alt="company-logo" />
      </div>
      <form class="rounded bg-white shadow p-5" id="myForm">
        <h3 class="text-dark fw-bolder fs-4 mb-2">Sign In to TLC Co.</h3>
        <div class="fw-normal text-muted mb-4">
          New Here? <a
            href="https://register-05.netlify.app/"
            class="text-primary fw-bold text-decoration-none"
            >Create Account</a
          >
        </div>
        <div class="form-floating mb-3">
          <input
            type="email"
            name="email"
            class="form-control"
            id="floatingInput"
            placeholder="name@example.com"
          />
          <label for="floatingInput">Email address</label>
        </div>
        <button type="submit" class="btn btn-primary submit_btn w-100 my-4">Continue</button>
      </form>
    </div>
  </div>
`;

//appending the fom section to main body
document.body.appendChild(section);

//creating dom loader event
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("myForm").addEventListener("submit", isEmailValid);
});

let email = "";
let stateId = "";

//checking if mail is valid by checking database if email exists or not
async function isEmailValid(event) {
  event.preventDefault();
  email = event.target.email.value;

  const res = await fetch("https://api.m3o.com/v1/user/List", {
    method: "POST",
    headers: {
      Authorization: "Bearer YzM1ODI1MjYtZmNlZi00OTRkLWJjNjEtNGE5YjIzODE0YzE5",
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  //program to check if email exist in database
  let flag = false;

  for (let i = 0; i < data.users.length; i++) {
    if (data.users[i].email === email) {
      flag = true;
      break;
    }
  }

  //if user found we redirect him for otp verification
  if (flag) {
    otpVerification(email);
  } else {
    alert("User has not signed up yet");
    event.target.email.value = "";
    event.target.password.value = "";
    return;
  }
}

//sending the user an email otp
async function otpVerification(email) {
  const userMail = {
    email: email,
  };

  const res = await fetch("https://api.mojoauth.com/users/emailotp", {
    method: "POST",
    headers: {
      "X-API-Key": "fa4a479c-d1a3-4278-a990-9c8bdf6602a5",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userMail),
  });

  const data = await res.json();

  document.getElementById("form-container").innerHTML = `
  <input type="text" placeholder="Enter OTP" class="col-12 mt-5 p-2 fs-5 rounded" id="otp"></input>
  <button class="btn btn-primary submit_btn w-100 my-4" id="otpCheck">Continue</button>
  `;

  document.getElementById("otpCheck").addEventListener("click", otpCheck);
  stateId = data.state_id;
  console.log(data.state_id);
}

//checking if the otp matches with the sent otp
async function otpCheck() {
  console.log(document.getElementById("otp").value, stateId);
  console.log(typeof document.getElementById("otp").value, typeof stateId);

  const userData = {
    OTP: document.getElementById("otp").value,
    state_id: `${stateId}`,
  };

  const res = await fetch("https://api.mojoauth.com/users/emailotp/verify", {
    method: "POST",
    headers: {
      "X-API-Key": "fa4a479c-d1a3-4278-a990-9c8bdf6602a5",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await res.json();

  console.log(data);

  //if otp matches we redirect the user to main page
  if (data.authenticated) {
    document.getElementById("form-container").innerHTML = `
      <img src="./images/success.gif" class="img-fluid" alt="success image"></img>
        Redirecting to main page...
    `;
    setTimeout(() => {
      window.location.href = "https://quotes-05.netlify.app/";
    }, 3000);
  } else {
    alert("wrong otp");
  }
}
