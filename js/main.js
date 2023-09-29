
  //Generar un número aleatorio entre 1 y 100
 const numeroSecreto = Math.floor(Math.random() * 100) + 1;
 let intentos = 0;

 function adivinarNumero() {
     const numeroUsuario = parseInt(document.getElementById("numeroUsuario").value);

     if (isNaN(numeroUsuario) || numeroUsuario < 1 || numeroUsuario > 100) {
         alert("Por favor, ingresa un número válido entre 1 y 100.");
         return;
     }

     intentos++;

     if (numeroUsuario === numeroSecreto) {
         document.getElementById("resultado").innerHTML = `¡Felicidades! Adivinaste el número ${numeroSecreto} en ${intentos} intentos.`;
         document.getElementById("numeroUsuario").setAttribute("disabled", true);
     } else if (numeroUsuario < numeroSecreto) {
         document.getElementById("resultado").innerHTML = "El número es más grande. Intenta de nuevo.";
     } else {
         document.getElementById("resultado").innerHTML = "El número es más pequeño. Intenta de nuevo.";
     }
}
const personas = [];

function agregarPersona() {
    const nombre = prompt("Ingrese el nombre de la persona:");
    const edad = parseInt(prompt("Ingrese la edad de la persona:"));

    if (nombre && !isNaN(edad)) {
        personas.push({ nombre, edad });
        actualizarResultados();
    } else {
        alert("Ingrese datos válidos.");
    }
}

function actualizarResultados() {
    const personasMayoresDe25 = personas.filter(persona => persona.edad > 25);
    const nombres = personas.map(persona => persona.nombre);
    const sumaEdades = personas.reduce((acumulador, persona) => acumulador + persona.edad, 0);

    const personasMayoresDe25List = document.getElementById('personasMayoresDe25');
    const nombresPersonasList = document.getElementById('nombresPersonas');
    const sumaEdadesElement = document.getElementById('sumaEdades');

    personasMayoresDe25List.innerHTML = "";
    nombresPersonasList.innerHTML = "";

    personasMayoresDe25.forEach(persona => {
        const listItem = document.createElement('li');
        listItem.textContent = `${persona.nombre} (${persona.edad} años)`;
        personasMayoresDe25List.appendChild(listItem);
    });

    nombres.forEach(nombre => {
        const listItem = document.createElement('li');
        listItem.textContent = nombre;
        nombresPersonasList.appendChild(listItem);
    });

    sumaEdadesElement.textContent = `La suma de edades es: ${sumaEdades} años`;
}