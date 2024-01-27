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
let nombre;
let nota1;
let nota2;

function promedio(nota1, nota2){
    let prom = (nota1 + nota2) / 2;
    console.log(`El promedio es ${prom}`)
}

for (let i = 0; i < alumnos; i++){
    nombre = prompt("Ingrese el nombre del alumno");
    nota1 = parseFloat(prompt(`Ingrese la nota del primer examen de ${nombre}`));
    nota2 = parseFloat(prompt(`Ingrese la nota del segundo examen de ${nombre}`));
    if ((nota1 >= 0 && nota1 < 4) && (nota2 >= 0 && nota2 < 4)){
        console.log(`El alumno ${nombre} debe recursar la materia`)
    } else if ((nota1 >= 4 && nota1 < 7) || (nota2 >= 4 && nota2 < 7)){
        console.log(`El alumno ${nombre} aprobó la cursada pero tiene que rendir un examen final`)
    } else if ((nota1 >= 0 && nota1 < 4) || (nota2 >= 0 && nota2 < 4)){
        console.log(`El alumno ${nombre} debe rendir recuperatorio`)
    } else {
        console.log(`El alumno ${nombre} promocionó la materia`)
    }
    promedio(nota1, nota2);
}

