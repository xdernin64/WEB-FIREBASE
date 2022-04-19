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
    getDoc,
    collectionGroup,
    onSnapshot,
    setDoc,
    doc,
    addDoc,
    Timestamp, deleteDoc, updateDoc
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
//update avisos
export const updateavisos = (id,campos) => {updateDoc(doc(db, "Avisos", id), campos);}
export const updatetareas = (id,campos) => {updateDoc(doc(db, "Tareas", id), campos);}
//elimnar avisos
export const eliminaraviso = (docid) => { deleteDoc(doc(db, "Avisos", docid)); }
//elimnar tareas
export const eliminartarea = (docid) => { deleteDoc(doc(db, "Tareas", docid)); }
//elimnar salidas
export const eliminarsalida = (docid) => { deleteDoc(doc(db, "salidas", docid)); }
//elimnar usuarios
export const eliminarusuario = (docid) => { deleteDoc(doc(db, "usuarios", docid)); }
//elimnar areas
export const eliminararea = (docid) => { deleteDoc(doc(db, "Areas", docid)); }
//elimnar subareas con query 
export const eliminarsubarea = (area, docid) => { deleteDoc(doc(db, "Areas/" + area + "/Subareas", docid)); }
//elimnar labor con query
export const eliminarlabor = (area, docid) => { deleteDoc(doc(db, "Areas/" + area + "/trabajos", docid)); }


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
export {
    onSnapshot,collection,db
}


//querygetDocs(query(collection(db, "Avisos")), where("estado" == "Activo"))

export const getavisos = (q) => getDocs(q);
export const getaviso = (id) => getDoc(doc(db, "Avisos", id));
export const gettareas = (q) => getDocs(q);
export const gettarea = (id) => getDoc(doc(db, "Tareas", id));

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
export const warningsweetalert = (mensaje, texto, funcioneliminar) => {
    
    Swal.fire({
        
        title: mensaje,
        text: texto,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Eliminalo!'
    }).then((result) => {
        if (result.isConfirmed) {
            
            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            )
            funcioneliminar;
        }
        else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            Swal.fire(
                'Cancelled',
                'Your imaginary file is safe :)',
                'error'
                
            )
            
        }
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
    