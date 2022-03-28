const signupform = document.querySelector('#singup-form');
signupform.addEventListener('submit', () => {

const signupemai = document.querySelector('#signup-email').value+"@OHYE.COM";
const signuppass = document.querySelector('#signup-password').value;

signInWithEmailAndPassword(auth, signupemai, signuppass)
.then((userCredential) => {
// Signed in
const user = userCredential.user;
console.log("sesioniniciada");
// ...
})
.catch((error) => {
const errorCode = error.code;
const errorMessage = error.message;
});

})
