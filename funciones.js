'use strict'
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
    where,
    orderBy,
    limit,
    getDocs,
    collectionGroup,
    onSnapshot,
    setDoc,
    doc,
    addDoc,
    Timestamp
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";
//import from firestore fielpath
import {
    FieldPath,
    documentId
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";
//creat function with function parameter
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
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export function tiemporeal(queryfunction, funcion) {
    var realtime = onSnapshot(queryfunction, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
            if (change.type === "added") {
                funcion;
            }
            if (change.type === "modified") {
                funcion;
            }
            if (change.type === "removed") {
                funcion;
            }
        });
    });
}
//guardar salida
export const guardarsalidas = (apellidosynombres, codigo, docid, fecha, horadesalida, horasextra, observacion, uid,idarea) => {
    setDoc(doc(db, "salidas", docid), {
        apellidosynombres,
        codigo,
        docid,
        fecha,
        horadesalida,
        horasextra,
        observacion,
        uid,
        idarea
    });
}
//guardar avisos
export const guardaravisos = (autor, uid, idarea, tituloaviso, fechapublicacion, fechaaviso, lugar, urgencia, aviso, estado) => {
    addDoc(collection(db, "Avisos"), {
        autor,
        uid,
        idarea,
        tituloaviso,
        fechapublicacion,
        fechaaviso,
        lugar,
        urgencia,
        aviso,
        estado
    });
}
export const guardartareas = (autor, uid, idarea, titulotarea,fechacreaciontarea, fechainiciotarea, fechafintarea, lugar, urgencia, tarea,estado,subarea) => {
    addDoc(collection(db, "Tareas"), {
        autor,
        uid,
        idarea,
        titulotarea,
        fechacreaciontarea,
        fechainiciotarea,
        fechafintarea,
        lugar,
        urgencia,
        tarea,
        estado,
        subarea
    });
}


//querygetDocs(query(collection(db, "Avisos")), where("estado" == "Activo"))

export const getavisos = (q) => getDocs(q);
export const gettareas = (q) => getDocs(q);

export const successsweetalert = (Mensaje) => {
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: Mensaje,
        showConfirmButton: false,
        timer: 1500
    })
}
export const errorsweetalert = (Mensaje) => {
    Swal.fire({
        position: 'center',
        icon: 'error',
        title: Mensaje,
        showConfirmButton: false,
        timer: 1500
    })
}
export const infosweetalert = (Mensaje) => {
    Swal.fire({
        position: 'center',
        icon: 'info',
        title: Mensaje,
        showConfirmButton: false,
        timer: 1500
    })
}
export const warningsweetalert = (Mensaje) => {
    Swal.fire({
        position: 'center',
        icon: 'warning',
        title: Mensaje,
        showConfirmButton: false,
        timer: 1500
    })
}
export const questionsweetalert = (Mensaje) => {
    Swal.fire({
        position: 'center',
        icon: 'question',
        title: Mensaje,
        showConfirmButton: false,
        timer: 1500
    })
}
export const formatofecha = (fecha) => {
    const dated = fecha.toDate().toLocaleDateString();
    fecha = dated;
    return fecha;
}
    