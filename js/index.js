/* 

Proyecto Academico Universitario (Primera Pre-Entrega)

En esta primera pre-entrega el proyecto consiste en un programa que permita que el usuario pueda ingresar una serie de alumnos y sus respectivas notas para luego calcular su nota final de cursada.
Ademas, el programa permitirá saber:
- Si el alumno promocionó la materia. (Este caso se dá si los 2 examenes tienen una nota de 7 o más, no se basa en el promedio entre los 2 examenes, sino en la nota de cada examen.)
- Si aprobo la cursada pero tiene que rendir un final. (Este caso se dá si al menos uno de los 2 examenes no supera el 7 como nota pero ambos examanes están aprobados con mas de 4.)
- Si tiene que rendir recuperatorio. (Este caso se dá cuando un exmaen está aprobado pero el otro está desaprobado.)
- Si tiene que recursar la materia. (Este caso se dá cuando ambos examenes están desaprobados.)

*/

const contenedor = document.getElementById('contenedorDiv')
const btn = document.getElementById('btn')
let listaAlumnos = JSON.parse(localStorage.getItem('listaAlumnos')) || [];

/* Constructor */

class Alumno {
    constructor(nombre, n1, n2) {
        this.nombre = nombre;
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

/* 
Evento:
Este evento permite que al hacer click en el boton 'Añadir alumno' el usuario pueda ingresar los datos necesarios
y que, junto a las funciones determinadas, se cree en el html los elementos necesarios para el agregado del alumno.
Ademas permite almacenar los datos de manera local gracias al uso del JSON y el localStorage.
7*/

btn.addEventListener('click', () => {
    const nombreAlumno = prompt("Ingrese el nombre de un alumno")
    const nota1 = parseFloat(prompt(`Ingrese la nota del primer parcial del alumno ${nombreAlumno}`))
    const nota2 = parseFloat(prompt(`Ingrese la nota del segundo parcial del alumno ${nombreAlumno}`))

    function promedio(nota1, nota2) {
        let prom = (nota1 + nota2) / 2;
        return prom;
    }

    const alumnoContenedor = document.createElement('tr')

    const nombreNuevoAlumno = document.createElement('td')
    const notaAlumno1 = document.createElement('td')
    const notaAlumno2 = document.createElement('td')
    const promedioAlumno = document.createElement('td')


    nombreNuevoAlumno.textContent = `${nombreAlumno}`
    notaAlumno1.textContent = `${nota1}`
    notaAlumno2.textContent = `${nota2}`
    promedioAlumno.textContent = `${promedio(nota1, nota2)}`

    alumnoContenedor.appendChild(nombreNuevoAlumno)
    alumnoContenedor.appendChild(notaAlumno1)
    alumnoContenedor.appendChild(notaAlumno2)
    alumnoContenedor.appendChild(promedioAlumno)

    let alum = new Alumno(nombreAlumno, nota1, nota2);
    listaAlumnos.push(alum);

    const informeCursada = document.createElement('td')

    if (alum.promocionados()) {
        informeCursada.textContent = `Promocion`
    } else if (alum.aprobados()) {
        informeCursada.textContent = `Aprobado a final`
    } else if (alum.desaprobados()) {
        informeCursada.textContent = `Recuperatorio`
    } else if (alum.recursados()) {
        informeCursada.textContent = `Recursa`
    } else {
        alert("Error")
    }

    alumnoContenedor.appendChild(informeCursada)

    contenedor.appendChild(alumnoContenedor)

    localStorage.setItem('listaAlumnos', JSON.stringify(listaAlumnos));
})
