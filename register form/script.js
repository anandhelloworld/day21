//creating container div
const container = document.createElement("div");

//creating register form
container.innerHTML = `
<div class="row">
  <div class="col-md-6 offset-md-3">
    <div class="signup-form">
      <form action="" class="mt-5 border p-4 bg-light shadow" id="myForm">
        <h4 class="mb-5 text-secondary">Create Your Account</h4>
        <div class="row">
          <div class="mb-3 col-md-6">
            <label>First Name<span class="text-danger">*</span></label>
            <input
              type="text"
              name="fname"
              class="form-control"
              placeholder="Enter First Name"
              required
            />
          </div>

          <div class="mb-3 col-md-6">
            <label>Last Name<span class="text-danger">*</span></label>
            <input
              type="text"
              name="Lname"
              class="form-control"
              placeholder="Enter Last Name"
              required
            />
          </div>
          
          <div class="mb-3 col-md-12">
            <label>E-mail<span class="text-danger">*</span></label>
            <input
              type="email"
              name="email"
              class="form-control"
              placeholder="Enter E-mail"
              required
            />
          </div>

        
          <div class="mb-3 col-md-12">
            <label>Phone<span class="text-danger">*</span></label>
            <input
              type="text"
              name="Phone"
              class="form-control"
              placeholder="Enter Phone-Number"
              required
            />
          </div>

          <div class="mb-3 col-md-12">
            <label>Password<span class="text-danger">*</span></label>
            <input
              type="password"
              name="password"
              class="form-control"
              placeholder="Enter Password"
              required
            />
          </div>

          <div class="mb-3 col-md-12">
            <label
              >Confirm Password<span class="text-danger">*</span></label
            >
            <input
              type="password"
              name="confirmpassword"
              class="form-control"
              placeholder="Confirm Password"
              required
            />
          </div>
          <div class="col-md-12">
            <button class="btn btn-primary float-end">Signup Now</button>
          </div>
        </div>
      </form>
      <p class="text-center mt-3 text-secondary" id='success-text'>
        If you have account, Please <a href="https://login-05.netlify.app/">Login Now</a>
      </p>
    </div>
  </div>
</div>
`;

//appending the container element with body
document.body.append(container);

//defining submit form event
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("myForm").addEventListener("submit", handleForm);
});

//callback submit function
function handleForm(event) {
  event.preventDefault();

  let form = event.target;

  const userData = {
    email: `${form.email.value}`,
    id: `${Math.random()}`,
    password: `${form.password.value}`,
    username: `${form.fname.value} ${form.Lname.value}`,
    profile: {
      phone: `+91${form.Phone.value}`,
    },
  };

  //checking if phone number is valid or not
  if (userData.profile.phone.length !== 13) {
    alert("Please enter valid phone number");
    form.Phone.value = "";
    return;
  }

  //checking if password and confirm password matches or not
  if (form.password.value !== form.confirmpassword.value) {
    alert("password doeen't match");
    form.password.value = "";
    form.confirmpassword.value = "";
    return;
  }

  //checking if password is 8 characters long or not
  if (form.password.value.length < 8) {
    alert("Password is less than 8 characters");
    form.password.value = "";
    form.confirmpassword.value = "";
    return;
  }

  //finally creating user account using api
  fetch("https://api.m3o.com/v1/user/Create", {
    method: "POST",
    headers: {
      'Authorization': "Bearer YzM1ODI1MjYtZmNlZi00OTRkLWJjNjEtNGE5YjIzODE0YzE5",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.account) {
        document.getElementById("myForm").innerHTML = `
          <img src="./images/success.gif" class="img-fluid" alt="success image"></img>
          <h4 class="text-center fw-bold">Account created successfully</h4> 
        `;
        document.getElementById("success-text").innerHTML =`
        <span class="fw-bold fs-6">
          Please wait !! redirecting to login page...
        </span>
        `
      }

    //redirecting user on successful account creation
      setTimeout(() => {
        window.location.href = "https://login-05.netlify.app/";
      },3000)
    })
    .catch((err) => alert(err));
}
