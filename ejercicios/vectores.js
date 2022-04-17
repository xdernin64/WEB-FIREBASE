'use strict'
function escribircarray(pregunta,vector) {
    document.write("<h2>" + pregunta + "</h2>");
    document.write("<ul>");
    vector.forEach((arra,index) => {
        document.write("<li>" + arra + "</li>");
        console.log(arra);
    });
    document.write("</ul>");
}	
//1-pedir 6 numeros y guardarlos en un array
var arreglo = [];
for (var i = 0; i < 6; i++) {
    arreglo[i] = parseInt(prompt("Ingrese un numero"));
    while (isNaN(arreglo[i])) {
        arreglo[i] = parseInt(prompt("Ingrese un numero"));
    }
}

//2-mostrar el array en consola y html

escribircarray("mostrar el array en consola y html",
    arreglo);

//3-ordenar el array de mayor a menor

arreglo.sort(function (a, b) { return a - b });
escribircarray("ordenar el array de mayor a menor",arreglo),

arreglo.sort(function (a, b) {
    return b - a
});

escribircarray("ordenar el array de menor a mayor", arreglo),
    

    document.write(`<h2>Tamaño de array</h2>`);

    document.write(arreglo.length);

document.write(`<h1>Buscar elemeto de un array y mostrar su indice</h1>`);
var buscar = 10;
//return true si lo encuentra
var indice = arreglo.indexOf(buscar);
document.write(`<h2>El elemento ${buscar} se encuentra en el indice ${indice}</h2>`);


