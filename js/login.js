var signup = () => {
  window.location.assign("./signup.html");
};
var ForgotPassword = () => {
  window.location.assign("./forgotpassword.html");
};
const email = document.getElementById("email");
const password = document.getElementById("password");
const message = document.getElementById("message");
var match = /^[\w\-\.\+]+\@[a-zA-Z0-9\. \-]+\.[a-zA-z0-9]{2,4}$/;

const Login = () => {
  if (email.value === "") {
    message.innerHTML = "Email Address Required!";
    message.style.color = "red";
    email.focus();
  } else if (!email.value.match(match)) {
    message.innerHTML = "Please Enter Vaild Email Address";
    message.style.color = "red";
    email.focus();
  }else if (password.value === "") {
    message.innerHTML = "Password Required";
    message.style.color = "red";
    password.focus();
  } else if (password.value.length < 6) {
    message.innerHTML = "Please Enter at least 6 digit Password";
    message.style.color = "red";
    password.focus();
  } else {
    const userData = {
      email: email.value,
      password: password.value,
    };

    firebase
      .auth()
      .signInWithEmailAndPassword(userData.email, userData.password)
      .then((res) => {
        message.innerHTML = "Successfully Login";
        message.style.color = "green";
        if (res.user.emailVerified) {
          setTimeout(() => {
            window.location.assign("./home.html");
          }, 2000);
        } else {
          setTimeout(() => {
            window.location.assign("./email-verification.html");
          }, 2000);
        }
      })
      .catch((error) => {
        message.innerHTML = error.message;
        message.style.color = "red";
      });
  }
};
