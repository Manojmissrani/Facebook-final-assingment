var signup = () => {
  window.location.assign("./signup.html");
};
var ForgotPassword = () => {
  window.location.assign("./forgotpassword.html");
};
const email = document.getElementById("email");
const password = document.getElementById("password");
const message = document.getElementById("message");
const Login = () => {
  if (email.value === "") {
    message.innerHTML = "Email required!";
    message.style.color = "red";
  } else if (password.value === "") {
    message.innerHTML = "Password required!";
    message.style.color = "red";
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
