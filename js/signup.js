var login = () => {
  window.location.assign("./login.html");
};
const firstName = document.getElementById("fristname");
const lastName = document.getElementById("lastname");
const email = document.getElementById("email");
const mobileNumber = document.getElementById("mobilenumber");
const password = document.getElementById("password");
const repassword = document.getElementById("Repassword");
const message = document.getElementById("message");
var match = /^[\w\-\.\+]+\@[a-zA-Z0-9\. \-]+\.[a-zA-z0-9]{2,4}$/;

const SignUp = () => {
  if (firstName.value === "") {
    message.innerHTML = "First Name Required!";
    message.style.color = "red";
    firstName.focus();
  } else if (lastName.value === "") {
    message.innerHTML = "Last Name Required!";
    message.style.color = "red";
    lastName.focus();
  } else if (mobileNumber.value === "") {
    message.innerHTML = "Mobile Number Required!";
    message.style.color = "red";
    mobileNumber.focus();
  } else if (mobileNumber.value.length < 11) {
    message.innerHTML = "Please Enter 11 digit Mobile No.";
    message.style.color = "red";
    mobileNumber.focus();
  } else if (email.value === "") {
    message.innerHTML = "Email Address Required!";
    message.style.color = "red";
    email.focus();
  } else if (!email.value.match(match)) {
    message.innerHTML = "Please Enter Valid Email Address";
    message.style.color = "red";
    email.focus();
  } else if (password.value === "") {
    message.innerHTML = "Password Required";
    message.style.color = "red";
    password.focus();
  } else if (password.value.length < 6) {
    message.innerHTML = "Please Enter at least 6 digit Password";
    message.style.color = "red";
    password.focus();
  } else if (repassword.value === "") {
    message.innerHTML = "Re Enter Password Required";
    message.style.color = "red";
    repassword.focus();
  } else if (repassword.value !== password.value) {
    message.innerHTML = "Password do not match";
    message.style.color = "red";
    repassword.focus();
  } else {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email.value, password.value)
      .then((userCredential) => {
        var d = new Date().toLocaleDateString();
        let date = new Date();
        weekdayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        var dateString =
          weekdayNames[date.getDay()] +
          " " +
          date.getHours() +
          ":" +
          ("00" + date.getMinutes()).slice(-2) +
          " ";

        //database
        var userdata = {
          firstName: firstName.value,
          lastName: lastName.value,
          mobileNumber: mobileNumber.value,
          email: email.value,
          password: password.value,
          repassword: repassword.value,
          uid: userCredential.user.uid,
          ProfilePicture: "",
          CoverPicture: "",
          Description: "",
          Signupdate: `${d},${dateString}`,
        };
        firebase
          .firestore()
          .collection("users")
          .doc(userCredential.user.uid)
          .set(userdata)
          // .collection("users")
          // .add(userdata)
          .then((res) => {
            message.innerHTML = "Successfully created New account";
            message.style.color = "green";
            const user = firebase.auth().currentUser;
            user.sendEmailVerification().then(() => {
              setTimeout(() => {
                window.location.assign("./email.html");
              }, 2000);
            });
            console.log(res);
          })
          .catch((error) => {
            message.innerHTML = error.message;
            message.style.color = "red";
          });
      });
  }
};
