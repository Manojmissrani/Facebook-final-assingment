// let email = document.getElementById("email");
// let message = document.getElementById("message");
// firebase.auth().onAuthStateChanged((user) => {
//   if (user) {
//     console.log(user);
//     if (user.emailVerified) {
//       window.location.assign("./home.html");
//     } else {
//       email.innerHTML = user.email;
//     }
//   } else {
//     window.location.assign("./login.html");
//   }
// });
// let recend = () => {
//   firebase
//     .auth()
//     .currentUser.sendEmailVerification()
//     .then(() => {
//       message.innerHTML =
//         "A verification link has been send to your email account";
//       message.style.color = "green";
//       message.style.marginBottom = "15px";
//     });
// };
// let reloud = () => {
//   location.reload();
// };

const userEmail = document.getElementById("email");
const message = document.getElementById("message");
firebase.auth().onAuthStateChanged((res) => {
  if (res.emailVerified) {
    window.location.assign("./home.html");
  } else {
    userEmail.innerHTML = res.email;
  }
});
const recend = () => {
  const user = firebase.auth().currentUser;
  user
    .sendEmailVerification()
    .then(() => {
      message.innerHTML = "Email verification sent!";
      message.style.color = "green";
    })
    .catch((err) => {
      message.innerHTML = err.message;
      message.style.color = "red";
    });
};
const reloud = () => {
  location.reload();
};
