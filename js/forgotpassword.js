let email = document.getElementById("email");
var match = /^[\w\-\.\+]+\@[a-zA-Z0-9\. \-]+\.[a-zA-z0-9]{2,4}$/;
let message = document.getElementById("message");
let reset = () => {
  if (email.value === "") {
    message.innerHTML = "Email Address Required!";
    message.style.color = "red";
    email.focus();
  } else if (!email.value.match(match)) {
    message.innerHTML = "Please Enter Valid Email Address";
    message.style.color = "red";
    email.focus();
  } else {
    firebase
      .auth()
      .sendPasswordResetEmail(email.value)
      .then(() => {
        message.innerHTML = "Password reset email sent. Please check email.";
        message.style.color = "green";
        setTimeout(() => {
          window.location.assign("./../pages/email.html")
        }, 1000);
      })
      .catch((error) => {
        message.innerHTML = error.message;
        message.style.color = "red";
      });
  }
};
let home = () => {
  window.location.reload();
};
