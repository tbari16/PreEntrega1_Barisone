/* 

Proyecto Academico Universitario (Primera Pre-Entrega)

En esta primera pre-entrega el proyecto consiste en un programa que permita que el usuario pueda ingresar una serie de alumnos y sus respectivas notas para luego calcular su nota final de cursada.
Ademas, el programa permitirá saber:
- Si el alumno promocionó la materia. (Este caso se dá si los 2 examenes tienen una nota de 7 o más, no se basa en el promedio entre los 2 examenes, sino en la nota de cada examen.)
- Si aprobo la cursada pero tiene que rendir un final. (Este caso se dá si al menos uno de los 2 examenes no supera el 7 como nota pero ambos examanes están aprobados con mas de 4.)
- Si tiene que rendir recuperatorio. (Este caso se dá cuando un exmaen está aprobado pero el otro está desaprobado.)
- Si tiene que recursar la materia. (Este caso se dá cuando ambos examenes están desaprobados.)

*/

let alumnos = parseInt(prompt("Ingresar la cantidad de alumnos que desea registrar"));
let listaAlumnos = [];

let nombre;
let nota1;
let nota2;

function promedio(nota1, nota2){
    let prom = (nota1 + nota2) / 2;
    console.log(`El promedio es ${prom}`)
}

class Alumno {
    constructor(nombre, apellido, n1, n2) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.n1 = n1;
        this.n2 = n2;
    }

    promocionados() {
        return this.n1 >= 7 && this.n2 >= 7;
    }

    aprobados() {
        return ((this.n1 >= 4 && this.n1 < 7) && (this.n2 >= 4)) || ((this.n2 >= 4 && this.n2 < 7) && (this.n1 >= 4));
    }

    desaprobados() {
        return ((this.n1 >= 0 && this.n1 < 4) && (this.n2 >= 4)) || ((this.n2 >= 0 && this.n2 < 4) && (this.n1 >= 4))
    }

    recursados() {
        return this.n1 < 4 && this.n2 < 4;
    }
}

for (let i = 0; i < alumnos; i++){
    nombre = prompt("Ingresa el nombre del alumno/a")
    apellido = prompt("Ingresa el apellido del alumno/a")
    nota1 = parseFloat(prompt("Ingrese la nota del primer parcial"))
    nota2 = parseFloat(prompt("Ingrese la nota del segundo parcial"))

    let alum = new Alumno(nombre,apellido,nota1,nota2)
    listaAlumnos.push(alum);

    if ((nota1 >= 0 && nota1 < 4) && (nota2 >= 0 && nota2 < 4)){
        console.log(`El alumno ${nombre} debe recursar la materia`)
    } else if (((nota1 >= 4 && nota1 < 7) && (nota2 >= 4)) || ((nota2 >= 4 && nota2 < 7) && (nota1 >= 4))){
        console.log(`El alumno ${nombre} aprobó la cursada pero tiene que rendir un examen final`)
    } else if (((nota1 >= 0 && nota1 < 4) && (nota2 >= 4)) || ((nota2 >= 0 && nota2 < 4) && (nota1 >= 4))){
        console.log(`El alumno ${nombre} debe rendir recuperatorio`)
    } else {
        console.log(`El alumno ${nombre} promocionó la materia`)
    }
    promedio(nota1, nota2);
}

function alumnosPromocionados() {
    return listaAlumnos.filter(alumno => alumno.promocionados());
}

function alumnosAprobados(){
    return listaAlumnos.filter(alumno => alumno.aprobados());
}

function alumnosDesaprobados() {
    return listaAlumnos.filter(alumno => alumno.desaprobados())
}

function alumnosRecursados() {
    return listaAlumnos.filter(alumno => alumno.recursados())
}

console.log("Los alumnos que promocionaron son:")
alumnosPromocionados().forEach(alumno => console.log(alumno.nombre + " " + alumno.apellido))

console.log("Los alumnos que aprobaron son:")
alumnosAprobados().forEach(alumno => console.log(alumno.nombre + " " + alumno.apellido))

console.log("Los alumnos que deben rendir un recuperatorio son:")
alumnosDesaprobados().forEach(alumno => console.log(alumno.nombre + " " + alumno.apellido))

console.log("Los alumnos que recursaron son:")
alumnosRecursados().forEach(alumno => console.log(alumno.nombre + " " + alumno.apellido))

/* for (let i = 0; i < alumnos; i++){
    nombre = prompt("Ingrese el nombre completo del alumno");
    nota1 = parseFloat(prompt(`Ingrese la nota del primer examen de ${nombre}`));
    nota2 = parseFloat(prompt(`Ingrese la nota del segundo examen de ${nombre}`));
    if ((nota1 >= 0 && nota1 < 4) && (nota2 >= 0 && nota2 < 4)){
        console.log(`El alumno ${nombre} debe recursar la materia`)
    } else if (((nota1 >= 4 && nota1 < 7) && (nota2 >= 4)) || ((nota2 >= 4 && nota2 < 7) && (nota1 >= 4))){
        console.log(`El alumno ${nombre} aprobó la cursada pero tiene que rendir un examen final`)
    } else if (((nota1 >= 0 && nota1 < 4) && (nota2 >= 4)) || ((nota2 >= 0 && nota2 < 4) && (nota1 >= 4))){
        console.log(`El alumno ${nombre} debe rendir recuperatorio`)
    } else {
        console.log(`El alumno ${nombre} promocionó la materia`)
    }
    promedio(nota1, nota2);
} */

