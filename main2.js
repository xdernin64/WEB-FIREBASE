// Import the functions you need from the SDKs you need
import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import {
    getAnalytics
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-analytics.js";
import {
    getDatabase
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";
import {
    getAuth,
    signInWithEmailAndPassword,
    signOut,
    createUserWithEmailAndPassword,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
//im 
import {
    getFirestore
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";
import {
    collection,
    query,
    where, orderBy, limit,
    getDocs} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

//import
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDoPhUYzDbw_S3mv6xh1_iXzSAMdzlLmrQ",
    authDomain: "raca-app.firebaseapp.com",
    databaseURL: "https://raca-app-default-rtdb.firebaseio.com",
    projectId: "raca-app",
    storageBucket: "raca-app.appspot.com",
    messagingSenderId: "227085469237",
    appId: "1:227085469237:web:54ed664228ba99e7e6537c",
    measurementId: "G-PWB061SHTW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize Firebase
const auth = getAuth();
const database = getDatabase(app);
//copilot get firestore
const firestore = getFirestore(app);
//copilot get collection functions
const db = getFirestore(app);





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

//listando usuarios 
const listaUsuarios = document.querySelector('.usuarios');
//evento de listar
const listarsalidas = document.querySelector('.listarsalidas');


auth.onAuthStateChanged(user => {
    if (user) {
        document.getElementById("cerrars").classList.remove('d-none');
        document.getElementById("loginb").classList.add('d-none');
        
        //use await 
        const q = query(collection(db, "usuarios"));
        
        async function consulta() {
            const querySnapshot = await getDocs(q);
            let html = '';
            //get size of the query 
            const size = querySnapshot.size;
            
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                //log doc codigo
                //Cargando usuarios
                
                console.log(doc.data().labor);


                const li = `

                <li class="list-group-item list-group-item-action">
                    <h5 class="text-light bg-dark">${doc.data().labor}</h5>
                    <p>${doc.data().apellidosynombres}</p>
                </li>
                `;
                html += li;

            });
            listaUsuarios.innerHTML = html;
            console.log(size);
    
            
            

            //cargando salidas
            const s = query(collection(db, "salidas"));
            

        }
        //consulta salidas 
        const qsalidas = query(collection(db, "salidas"),orderBy("fecha", "desc"));
        async function consultaSalidas() {
            const querySnapshot = await getDocs(qsalidas);
            let htmlsalidas = '';
            const fechanterior = new Date();
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                //log doc codigo
                //Cargando salidas
                console.log(doc.data().labor);

                //convert datestring to dd/mm/yyyy
                const dated = doc.data().fecha.toDate().toLocaleDateString();
                const li = `
                <li class="list-group-item list-group-item-action">
                    <h5 class="text-light bg-success">${dated}</h5>
                    <p>${doc.data().apellidosynombres}</p>
                    <p>${doc.data().horadesalida}</p>
                </li>
                `;
                htmlsalidas += li;
                const ldt = dated;
                
            });
            listarsalidas.innerHTML = htmlsalidas;
        }
        consultaSalidas();
        consulta();
        

        







    } else {
        document.getElementById("cerrars").classList.add('d-none');
        document.getElementById("loginb").classList.remove('d-none');
    };
});