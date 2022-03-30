const signupform = document.querySelector('#singup-form');
signupform.addEventListener('submit', (event) => {
    event.preventDefault();
    const signupemai = document.querySelector('#signup-email').value + "@OHYE.COM";
    const signuppass = document.querySelector('#signup-password').value;

    signInWithEmailAndPassword(auth, signupemai, signuppass)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            signupform.reset();
            //refresh page
            location.reload();


            console.log("sesioniniciada");
        })
        .catch((error) => {

            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
        });

})
cerrars.addEventListener('click', () => {
    signOut(auth).then(() => {

        // Sign-out successful.
        console.log("sesion cerrada");
    }).catch((error) => {
        // An error happened.
    });
})
auth.onAuthStateChanged(user => {
    if (user) {
        document.getElementById("cerrars").classList.remove('d-none');
        document.getElementById("loginb").classList.add('d-none');

        //use await 
        const q = query(collection(db, "cities"), where("capital", "==", true));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        });

    } else {
        document.getElementById("cerrars").classList.add('d-none');
        document.getElementById("loginb").classList.remove('d-none');
    };
});