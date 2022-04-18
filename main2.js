//import sweetalert cdm
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
    onAuthStateChanged,
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
    Timestamp,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";
//import from firestore fielpath
import {
    FieldPath,
    documentId,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";
import {
    tiemporeal,
    guardarsalidas,
    guardaravisos,
    successsweetalert,
    errorsweetalert,
    questionsweetalert,
    getavisos,
    guardartareas,
    gettareas
} from "./funciones.js";

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
    measurementId: "G-PWB061SHTW",
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getFirestore(app);
const signupform = document.querySelector("#singup-form");
$(document).ready(function () {
    $("#abrir-modal").click(function () {
        $("#signinmodal").modal("show");
    });
});
//inicio de sesion con firebase
signupform.addEventListener("submit", (event) => {
    event.preventDefault();
    const signupemai =
        document.querySelector("#signup-email").value + "@OHYE.COM";
    const signuppass = document.querySelector("#signup-password").value;

    signInWithEmailAndPassword(auth, signupemai, signuppass)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            const labor = signupform.reset();
            $("#signinmodal").modal("hide");
            successsweetalert("Sesíon iniciada");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
            errorsweetalert("Error al iniciar sesión revisa tus credenciales");
        });
});
//cerrado de sesion
cerrars.addEventListener("click", () => {
    signOut(auth)
        .then(() => {
            location.reload();
            successsweetalert("Sesíon cerrada");
            // Sign-out successful.
        })
        .catch((error) => {
            // An error happened.
        });
});
//listando usuario actual
const usuarioactual = document.querySelector(".usuarioactual");
//listando usuarios
const listaUsuarios = document.querySelector(".usuarios");
//evento de listar
const listarsalidas = document.querySelector(".listarsalidas");
const listaravisos = document.querySelector(".listaravisos");
const listartareas = document.querySelector(".listartareas");
//listar areas
const listaAreas = document.querySelector("#listaAreas");
//listar sublabores
const listarsubareas = document.querySelector("#subarea");
const listarqsubareas = document.querySelector("#subareaquery");
//listar labores
const listaLabores = document.querySelector("#listaLabores");
const registerform = document.querySelector("#registerform");
//datos de usuario
auth.onAuthStateChanged((user) => {
    if (user) {
        //get area from firestore
        document.getElementById("contenidousr").classList.remove("d-none");
        //obteniendo datos del usuario actual
        console.log(user.uid);
        const duser = query(
            collection(db, "usuarios"),
            where("uid", "==", user.uid)
        );

        async function currentuser() {
            const usuario = await getDocs(duser);
            var htmlusuario = "";
            usuario.forEach((doc) => {
                const li = `
                <p id="codigoactual">${doc.data().codigo}<p>
                <p id="apellidosynombresactual">${doc.data().apellidosynombres
                    }<p>
                <p id="idareactual" class="d-none">${doc.data().idarea}<p>
                <p id="areactual">${doc.data().area}<p>
                <p id="laboractual" value="${doc.data().idlabor}">${doc.data().labor
                    }<p>
                `;
                htmlusuario += li;
            });
            usuarioactual.innerHTML = htmlusuario;
            cargarspn();
            consultaTrabajos(1);
            consultaAreas();
            consulta();
            document.getElementById("nav-avisos-tab").click();
            document.getElementById("pills-activo-tab").click();
        }
        //definiendo usuarios

        registerform.addEventListener("submit", (e) => {
            e.preventDefault();
            let emailregister =
                document.querySelector("#register-codigo").value + "@OHYE.COM";
            let passwordregister = document.querySelector("#register-password").value;
            let nombreregister = document.querySelector("#register-nombre").value;
            let codigoregister = document.querySelector("#register-codigo").value;
            let telefonoregister = document.querySelector("#register-celular").value;
            let area = $("#listaAreas option:selected").text();
            let idarea = $("#listaAreas option:selected").val();
            let areadocument = $("#listaAreas option:selected").val();
            let labordocument = $("#listaLabores option:selected").val();
            let labor = $("#listaLabores option:selected").text();
            let idlabor = $("#listaLabores option:selected").val();
            createUserWithEmailAndPassword(auth, emailregister, passwordregister)
                .then((userCredential) => {
                    // Signed in
                    let user = userCredential.user.uid;
                    console.log(user);

                    //save dates in firestore collection
                    //random id
                    //var iduser = database.ref().child('users').push().key;
                    async function agregarusuario(colleccion) {
                        await setDoc(doc(db, colleccion, user), {
                            apellidosynombres: nombreregister,
                            codigo: codigoregister,
                            celular: telefonoregister,
                            area: area,
                            labor: labor,
                            correo: emailregister,
                            password: passwordregister,
                            uid: user,
                            idlabor: idlabor,
                            idarea: idarea,
                        });
                    }
                    agregarusuario("usuarios");
                    agregarusuario(
                        "Areas/" + areadocument + "/trabajos/" + labordocument + "/usuarios"
                    );
                    successsweetalert("usuario creado");
                    $("#registermodal").modal("hide");
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorMessage);
                });
        });
        //cargando usuarios
        document.getElementById("cerrars").classList.remove("d-none");
        document.getElementById("loginb").classList.add("d-none");
        document.getElementById("barradenavegacion").classList.remove("d-none");
        document.getElementById("paginainicio").classList.add("d-none");
        document.getElementById("menunav").classList.remove("d-none");
        const q = query(collection(db, "usuarios"));
        async function consulta() {
            const querySnapshot = await getDocs(q);
            let html = "";
            //get size of the query
            const size = querySnapshot.size;
            querySnapshot.forEach((doc) => {
                const li = `
                <li class="list-group-item list-group-item-action ">
                    <h5 class="text-light bg-dark">${doc.data().labor}</h5>
                    <p>${doc.data().apellidosynombres}</p>
                </li>
                `;
                html += li;
            });
            listaUsuarios.innerHTML = html;
        }
        //SALIDAS DE USUARIOS
        var qsalidas = query(collection(db, "salidas"), orderBy("fecha", "desc"));
        async function consultaSalidas() {
            onSnapshot(qsalidas, (querySnapshot) => {
                let htmlsalidas = "";
                var fechanterior = "fin de las salidas";
                querySnapshot.forEach((doc) => {
                    const dated = doc.data().fecha.toDate().toLocaleDateString();

                    if (fechanterior != dated) {
                        const li = `
                    <hr>    
                <h3>${dated}</h3>
                <li class="salidar list-group-item list-group-item-action rounded-3">
                    
                    <p>${doc.data().apellidosynombres}</p>
                    <p>${doc.data().horadesalida}</p>
                </li>
                `;
                        fechanterior = dated;
                        htmlsalidas += li;
                    } else {
                        const li = `
                <li class = "salidar list-group-item list-group-item-action rounded-3" >
                    <p>${doc.data().apellidosynombres}</p>
                    <p>${doc.data().horadesalida}</p>
                </li>
                `;
                        htmlsalidas += li;
                    }
                });
                listarsalidas.innerHTML = htmlsalidas;
            });


        }
        //guardar avisos
        const avisosform = document.getElementById("form-avisos");
        avisosform.addEventListener("submit", (e) => {
            e.preventDefault(errorsweetalert("Revise sus datos ingresados"));
            let autor = document.querySelector(
                "#apellidosynombresactual"
            ).textContent;
            let uid = user.uid;
            let idarea = document.querySelector("#areactual").textContent;
            let tituloaviso = document.querySelector("#titulodelaviso").value;
            let fechastraviso = document.querySelector("#fechaviso").value;
            console.log(fechastraviso);
            //creando timestamp fecha de publicacion
            let momentoaviso = moment(fechastraviso, "YYYYMMDD"); // 1st argument - string, 2nd argument - format
            let objetoaviso = momentoaviso.toDate();
            let fechaaviso = Timestamp.fromDate(objetoaviso);
            //creando timestamp fecha de publicacion
            let fechactual = new Date().toLocaleDateString("en-CA");
            let momentopublicacion = moment(fechactual, "YYYYMMDD"); // 1st argument - string, 2nd argument - format
            let objetopublicacion = momentopublicacion.toDate();
            let fechapublicacion = Timestamp.fromDate(objetopublicacion);
            let lugar = document.querySelector("#lugardelaviso").value;
            let urgencia = document.querySelector("#urgenciaaviso").value;
            let aviso = document.querySelector("#aviso").value;
            let estado = document.querySelector("#estadoaviso").value;
            guardaravisos(
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
            );
            successsweetalert("Aviso creado");
            avisosform.reset();
        });
        //guardar tareas
        const tareasform = document.getElementById("form-tareas");
        tareasform.addEventListener("submit", (e) => {
            e.preventDefault(errorsweetalert("Revise sus datos ingresados"));
            let autor = document.querySelector(
                "#apellidosynombresactual"
            ).textContent;
            let uid = user.uid;
            let idarea = document.querySelector("#areactual").textContent;
            let titulotarea = document.querySelector("#titulodelavtarea").value;
            //fecha de creacion
            let fechacreacionactual = new Date().toLocaleDateString("en-CA");
            let momentocreacion = moment(fechacreacionactual, "YYYYMMDD"); // 1st argument - string, 2nd argument - format
            let objetocreacion = momentocreacion.toDate();
            let fechacreacion = Timestamp.fromDate(objetocreacion);
            //fecha de inicio
            let fechainicioactual = document.querySelector("#fechainiciotarea").value;
            let momentoinicio = moment(fechainicioactual, "YYYYMMDD"); // 1st argument - string, 2nd argument - format
            let objetoinicio = momentoinicio.toDate();
            let fechainicio = Timestamp.fromDate(objetoinicio);
            //fecha de finalizacion
            let fechafinalizacionactual = document.querySelector(
                "#fechafintarea"
            ).value;
            let momentofinalizacion = moment(fechafinalizacionactual, "YYYYMMDD"); // 1st argument - string, 2nd argument - format
            let objetofinalizacion = momentofinalizacion.toDate();
            let fechafinalizacion = Timestamp.fromDate(objetofinalizacion);
            //fin fechas
            let lugar = document.querySelector("#lugardelatarea").value;
            let urgencia = document.querySelector("#urgenciatarea").value;
            let tarea = document.querySelector("#desctarea").value;
            let estado = document.querySelector("#estadotarea").value;
            let subarea = document.querySelector("#subarea").value;
            guardartareas(
                autor,
                uid,
                idarea,
                titulotarea,
                fechacreacion,
                fechainicio,
                fechafinalizacion,
                lugar,
                urgencia,
                tarea,
                estado,
                subarea
            );
            successsweetalert("Tarea creada");
            tareasform.reset();
        });

        //guardando salidas
        const salidasform = document.getElementById("form-salidas");
        salidasform.addEventListener("submit", (e) => {
            e.preventDefault();
            let fechastr = document.querySelector("#date").value;
            let dategtm = new Date(fechastr);
            let horadesalida = document.querySelector("#horadesalida").value;
            let apellidosynombres = document.querySelector(
                "#apellidosynombresactual"
            ).textContent;
            let codigo = document.querySelector("#codigoactual").textContent;
            let uid = user.uid;
            let timesalida = horadesalida.split(":");
            let horasextras = timesalida[0] * 1 + timesalida[1] / 60 - 14.75;
            let observacion = document.querySelector("#comentarios").value;
            let arrDate = fechastr.split("-");
            let fechacod = arrDate[2] + arrDate[1] + arrDate[0];
            var dateMomentObject = moment(fechacod, "DDMMYYYY"); // 1st argument - string, 2nd argument - format
            var dateObject = dateMomentObject.toDate();
            if (horasextras > 0) {
                horasextras = Number(horasextras.toFixed(2));
            } else {
                horasextras = Number(0);
            }
            let fecha = Timestamp.fromDate(dateObject);
            let documentId = fechacod + codigo;
            let idarea = document.querySelector("#areactual").textContent;
            console.log(fechacod);
            console.log(dateObject);
            guardarsalidas(
                apellidosynombres,
                codigo,
                documentId,
                fecha,
                horadesalida,
                horasextras,
                observacion,
                uid,
                idarea
            );
            //sucess submit function
            successsweetalert("Salida registrada");
        });

        //consulta areas
        const qareas = query(collection(db, "Areas"));
        async function consultaAreas() {
            const querySnapshot = await getDocs(qareas);
            let htmlareas = "";
            querySnapshot.forEach((doc) => {
                const li = `
                    <option value="${doc.id}">${doc.data().Nombre}</option>
                    `;
                htmlareas += li;
            });
            listaAreas.innerHTML = htmlareas;
        }
        //consulta subaareas
        async function consultaSubAreas(area) {
            const qsubareas = query(
                collection(db, "Areas/" + area + "/Subareas")
            );
            onSnapshot(qsubareas, (querySnapshot) => {
                let htmlsubareas = '<option value="none" selected disabled hidden>Seleccione </option>;';

                querySnapshot.forEach((doc) => {
                    const li = `
                    <option value="${doc.data().Nombre}">${doc.data().Nombre}</option>
                    `;
                    htmlsubareas += li;
                });
                listarsubareas.innerHTML = htmlsubareas;
                listarqsubareas.innerHTML = htmlsubareas;
            });

        }
        //function para cargar labores con cambio de dropdown
        async function consultaTrabajos(area) {
            const qtrabajos = query(collection(db, "Areas/" + area + "/trabajos"));
            const querySnapshot = await getDocs(qtrabajos);
            let htmltrabajos = "";
            querySnapshot.forEach((doc) => {
                const li = `
                    <option value="${doc.id}">${doc.data().Nombre}</option>
                    `;
                htmltrabajos += li;
            });
            listaLabores.innerHTML = htmltrabajos;
        }


        //cargando areas
        listaAreas.addEventListener("change", (event) => {
            const area = $("#listaAreas :selected").val();
            consultaTrabajos(area);
        });
        //funcion asyncrona listando avisos
        async function avisoss(q) {
            onSnapshot(q, querySnapshot => {
                let htmlavisos = "";

                querySnapshot.forEach((doc) => {
                    console.log(doc.data().estado);
                    let classcard = "";
                    let classheader = "";
                    let classbody = "";
                    let classtittle = "";
                    if (doc.data().estado == "Activo") {
                        classcard = "border-dark text-white shadow";
                        classheader = "bg-success";
                        classbody = "text-success";
                        classtittle = "text-success";
                    } else {
                        classcard = "border-secondary shadow";
                        classheader = "";
                        classbody = "";
                        classtittle = "";
                    }
                    htmlavisos += `
                        <div class="col">
                        <div class="card ${classcard} rounded m-1">
                        <div class="card-header ${classheader}">Fecha: ${doc
                                        .data()
                                        .fechaaviso.toDate()
                                        .toLocaleDateString()}
                        </div>
                            <div class="card-body ${classbody}">
                                <h5 class="card-tittle ${classtittle} text-center mb-2">${doc.data().tituloaviso
                                    }</h5>

                                <p class="card-text">Lugar: ${doc.data().lugar
                                    }</p>
                                <p class="card-text">Urgencia: ${doc.data().urgencia
                                    }</p>
                                <p class="card-text d-none">Estado: ${doc.data().estado
                                    }</p>
                                <p class="card-text">Detalles:${doc.data().aviso
                                    }</p>
                                </div>
                        </div>
                        </div>
                        `;
                });
                listaravisos.innerHTML = htmlavisos;
            });


        }
        //funcion asyncrona listando tareas
        async function tareass(q) {
            onSnapshot(q, querySnapshot => {
                let htmltareas = "";
                querySnapshot.forEach((doc) => {
                    let classcard = "";
                    if (doc.data().estado == "Cumplida") {
                        classcard = "text-white bg-dark shadow mb-3";

                    } else if (doc.data().estado == "En proceso") {
                        classcard = "text-dark bg-info shadow mb-3";

                    } else if (doc.data().estado == "Pendiente") {
                        if (doc.data().urgencia == "Alta") {
                            classcard = "text-white bg-danger shadow mb-3";
                        } else if (doc.data().urgencia == "Media") {
                            classcard = "text-dark bg-warning shadow mb-3";
                        } else if (doc.data().urgencia == "Baja") {
                            classcard = "text-white bg-success shadow mb-3";
                        }
                    }
                    htmltareas += `
                <div class="col">
                <div class="card ${classcard} rounded m-1 p-2">
                <div class="card-header>Prioridad: ${doc.data().urgencia}
                </div>
                    <div class="card-body">
                        <h5 class="card-tittle text-center mb-2">${doc.data().titulotarea
                            }</h5>
                        <p class="card-text  d-none" id="subareacard">Sub Area: ${doc.data().subarea
                            }</p>
                        <p class="card-text">Lugar: ${doc.data().lugar
                            }</p>
                        <p class="card-text">Fecha de inicio: ${doc
                        .data()
                        .fechainiciotarea.toDate()
                        .toLocaleDateString()
                            }
                        </p>
                        <p class="card-text">Fecha de inicio: ${doc
                        .data()
                        .fechafintarea.toDate()
                        .toLocaleDateString()
                            }</p>
                        <p class="card-text">Detalles:${doc.data().tarea
                            }</p>
                        </div>
                </div>
                </div>
                `;
                });
                listartareas.innerHTML = htmltareas;
            });
        }
        //navegacion de avisos
        document
            .getElementById("nav-avisos-tab")
            .addEventListener("click", (event) => {
                document.getElementById("Salidas").classList.add("d-none");
                document.getElementById("Avisos").classList.remove("d-none");
                document.getElementById("Tareas").classList.add("d-none");
                document.getElementById("pills-activo-tab").click();
            });
        document.getElementById("pills-activo-tab").addEventListener("click", (event) => {
            let idarea = document.querySelector("#areactual").textContent;
            let q = query(collection(db, "Avisos"), where("idarea", "==", idarea), where("estado", "==", "Activo"));
            avisoss(q);


        });
        document.getElementById("pills-inactivo-tab").addEventListener("click", (event) => {
            let idarea = document.querySelector("#areactual").textContent;
            let q = query(collection(db, "Avisos"), where("idarea", "==", idarea), where("estado", "==", "Inactivo"));
            avisoss(q);
        });

        //navegacion de tareas
        async function cargarspn() {
            var iddarea = document.querySelector("#idareactual").textContent;
            consultaSubAreas(iddarea);
        }

        document
            .getElementById("nav-tareas-tab")
            .addEventListener("click", (event) => {
                document.getElementById("Salidas").classList.add("d-none");
                document.getElementById("Avisos").classList.add("d-none");
                document.getElementById("Tareas").classList.remove("d-none");

            });
        document.getElementById("subareaquery").addEventListener("change", (event) => {
            document.getElementById("nav-Pendiente-tab").click();
        });
        document.getElementById("nav-Pendiente-tab").addEventListener("click", (event) => {
            let subarea = $("#subareaquery :selected").val();
            let idarea = document.querySelector("#areactual").textContent;
            let q = query(collection(db, "Tareas"), where("idarea", "==", idarea), where("subarea", "==", subarea), where("estado", "==", "Pendiente"));
            tareass(q);
            //count click    
        });
        document.getElementById("nav-Curso-tab").addEventListener("click", (event) => {
            let subarea = $("#subareaquery :selected").val();
            let idarea = document.querySelector("#areactual").textContent;
            let q = query(collection(db, "Tareas"), where("idarea", "==", idarea), where("subarea", "==", subarea), where("estado", "==", "En proceso"));
            tareass(q);
        });
        document.getElementById("nav-Terminado-tab").addEventListener("click", (event) => {
            let subarea = $("#subareaquery :selected").val();
            let idarea = document.querySelector("#areactual").textContent;
            let q = query(collection(db, "Tareas"), where("idarea", "==", idarea), where("subarea", "==", subarea), where("estado", "==", "Cumplida"));
            tareass(q);
        });

        //navegacion de salidas
        document
            .getElementById("nav-salidas-tab")
            .addEventListener("click", (event) => {


                consultaSalidas();

                document.getElementById("Salidas").classList.remove("d-none");
                document.getElementById("Avisos").classList.add("d-none");
                document.getElementById("Tareas").classList.add("d-none");
            });

        currentuser();


    } else {
        document.getElementById("menunav").classList.add("d-none");
        document.getElementById("cerrars").classList.add("d-none");
        document.getElementById("contenidousr").classList.add("d-none");
        document.getElementById("loginb").classList.remove("d-none");
    }
});