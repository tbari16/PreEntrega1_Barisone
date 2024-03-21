/* 

Proyecto Academico Universitario (Primera Pre-Entrega)

En esta primera pre-entrega el proyecto consiste en un programa que permita que el usuario pueda ingresar una serie de alumnos y sus respectivas notas para luego calcular su nota final de cursada.
Ademas, el programa permitirá saber:
- Si el alumno promocionó la materia. (Este caso se dá si los 2 examenes tienen una nota de 7 o más, no se basa en el promedio entre los 2 examenes, sino en la nota de cada examen.)
- Si aprobo la cursada pero tiene que rendir un final. (Este caso se dá si al menos uno de los 2 examenes no supera el 7 como nota pero ambos examanes están aprobados con mas de 4.)
- Si tiene que rendir recuperatorio. (Este caso se dá cuando un exmaen está aprobado pero el otro está desaprobado.)
- Si tiene que recursar la materia. (Este caso se dá cuando ambos examenes están desaprobados.)

*/

const contenedor = document.getElementById('contenedorDiv');
const btn = document.getElementById('btn');
let listaAlumnos = JSON.parse(localStorage.getItem('listaAlumnos')) || [];

// /* Constructor */

class Alumno {
    constructor(nombre, n1, n2, email) {
        this.nombre = nombre;
        this.n1 = n1;
        this.n2 = n2;
        this.email = email; // Asegúrate de incluir el parámetro email en el constructor
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

// Consrguir mail aleatorio

async function obtenerCorreoAleatorio() {
    try {
        const response = await fetch('https://randomuser.me/api/');
        const data = await response.json();
        const email = data.results[0].email;
        return email;
    } catch (error) {
        console.error('Error al obtener el correo electrónico aleatorio:', error);
        alert('Error al obtener el correo electrónico aleatorio, inténtelo de nuevo.');
    }
}

// Evento de click para agregar un nuevo alumno

async function agregarAlumno() {
    try {
        const email = await obtenerCorreoAleatorio(); // Obtener el correo electrónico aleatorio de la API
        const nombre = prompt("Ingrese el nombre del alumno:");
        const nota1 = parseFloat(prompt("Ingrese la primera nota del alumno:"));
        const nota2 = parseFloat(prompt("Ingrese la segunda nota del alumno:"));
        if (!nombre || isNaN(nota1) || isNaN(nota2)) {
            throw new Error("Debe ingresar todos los campos y notas válidas.");
        }
        const alumno = new Alumno(nombre, nota1, nota2, email);
        listaAlumnos.push(alumno);
        localStorage.setItem('listaAlumnos', JSON.stringify(listaAlumnos));
        agregarAlumnoDOM(alumno);
        mostrarNotificacion();
    } catch (error) {
        console.error('Error al agregar el alumno:', error);
        alert('Error al agregar el alumno, inténtelo de nuevo.');
    }
}

// Función para agregar un nuevo alumno al DOM

function agregarAlumnoDOM(alumno) {
    const alumnoContenedor = document.createElement('tr')

    const nombreNuevoAlumno = document.createElement('td')
    const notaAlumno1 = document.createElement('td')
    const notaAlumno2 = document.createElement('td')
    const promedioAlumno = document.createElement('td')
    const emailAlumno = document.createElement('td')

    nombreNuevoAlumno.textContent = alumno.nombre;
    notaAlumno1.textContent = alumno.n1;
    notaAlumno2.textContent = alumno.n2;
    promedioAlumno.textContent = (alumno.n1 + alumno.n2) / 2;
    emailAlumno.textContent = alumno.email;

    alumnoContenedor.appendChild(nombreNuevoAlumno)
    alumnoContenedor.appendChild(notaAlumno1)
    alumnoContenedor.appendChild(notaAlumno2)
    alumnoContenedor.appendChild(promedioAlumno)
    alumnoContenedor.appendChild(emailAlumno)

    const informeCursada = document.createElement('td')

    if (alumno.promocionados()) {
        informeCursada.textContent = `Promocion`
    } else if (alumno.aprobados()) {
        informeCursada.textContent = `Aprobado a final`
    } else if (alumno.desaprobados()) {
        informeCursada.textContent = `Recuperatorio`
    } else if (alumno.recursados()) {
        informeCursada.textContent = `Recursa`
    } else {
        alert("Error")
    }

    alumnoContenedor.appendChild(informeCursada)

    contenedor.appendChild(alumnoContenedor)
}

// Función para mostrar la notificación de Toastify

function mostrarNotificacion() {
    const Toast = Swal.mixin({
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });
    Toast.fire({
        icon: "success",
        title: "Alumno agregado con éxito!"
    });
}

// Cargar datos de los alumnos al cargar la página

window.addEventListener('load', () => {
    cargarDatosDesdeJSON()
        .then(data => {
            data.forEach(agregarAlumnoDOM);
        })
        .catch(error => console.error(error));
});

// Eventos de click para agregar un nuevo alumno

btn.addEventListener('click', agregarAlumno);

// Función para cargar los datos de los alumnos desde el JSON local

function cargarDatosDesdeJSON() {
    return new Promise((resolve, reject) => {
        const datos = localStorage.getItem('listaAlumnos');
        if (datos) {
            resolve(JSON.parse(datos));
        } else {
            reject("No se encontraron datos de alumnos en el almacenamiento local.");
        }
    });
}

