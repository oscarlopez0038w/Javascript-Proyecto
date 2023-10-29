
/*  //Generar un número aleatorio entre 1 y 100
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

const notaInput = document.getElementById("nota");
    const agregarButton = document.getElementById("agregar");
    const listaNotas = document.getElementById("lista-notas");

    // Obtener las notas desde localStorage al cargar la página
    const notas = JSON.parse(localStorage.getItem("notas")) || [];

    // Mostrar las notas existentes en la página
    function mostrarNotas() {
      listaNotas.innerHTML = "";
      notas.forEach((nota, index) => {
        const li = document.createElement("li");
        li.textContent = nota;
        const botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar";
        botonEliminar.addEventListener("click", () => eliminarNota(index));
        li.appendChild(botonEliminar);
        listaNotas.appendChild(li);
      });
    }

    // Agregar una nota
    function agregarNota() {
      const nuevaNota = notaInput.value;
      if (nuevaNota) {
        notas.push(nuevaNota);
        notaInput.value = "";
        localStorage.setItem("notas", JSON.stringify(notas));
        mostrarNotas();
      }
    }

    // Eliminar una nota
    function eliminarNota(index) {
      notas.splice(index, 1);
      localStorage.setItem("notas", JSON.stringify(notas));
      mostrarNotas();
    }

    agregarButton.addEventListener("click", agregarNota);

    // Mostrar las notas existentes al cargar la página
    mostrarNotas(); */

    let carrito = [];
    let total = 0;
    
    // Función para cargar el carrito desde el localStorage al cargar la página
    cargarCarritoDesdeLocalStorage();
    
    // Función para cargar el carrito desde el localStorage
    function cargarCarritoDesdeLocalStorage() {
        const carritoGuardado = localStorage.getItem('carrito');
        const totalGuardado = localStorage.getItem('total');
    
        if (carritoGuardado && totalGuardado) {
            carrito = JSON.parse(carritoGuardado);
            total = parseFloat(totalGuardado);
        }
    
        actualizarCarrito();
    
        // Habilitar el botón de "Pagar" si el carrito no está vacío
        const pagarButton = document.getElementById('pagar');
        if (carrito.length > 0) {
            pagarButton.removeAttribute('disabled');
        }
    }
    
    // Función para guardar el carrito en el localStorage
    function guardarCarritoEnLocalStorage() {
        localStorage.setItem('carrito', JSON.stringify(carrito));
        localStorage.setItem('total', total);
    }
    
    // Función para agregar un producto al carrito
    function agregarAlCarrito(nombre, precio) {
        const producto = { nombre, precio };
        carrito.push(producto);
        total += precio;
        actualizarCarrito();
        guardarCarritoEnLocalStorage();
    
        // Mostrar una alerta de éxito con SweetAlert
        Swal.fire({
            title: 'Producto Agregado',
            text: `${nombre} ha sido agregado al carrito.`,
            icon: 'success'
        });
    
        // Habilitar el botón de "Pagar" si hay productos en el carrito
        const pagarButton = document.getElementById('pagar');
        if (carrito.length > 0) {
            pagarButton.removeAttribute('disabled');
        }
    }
    
    // Función para eliminar un producto del carrito
    function eliminarDelCarrito(index) {
        total -= carrito[index].precio;
        carrito.splice(index, 1);
        actualizarCarrito();
        guardarCarritoEnLocalStorage();
    
        // Mostrar una alerta de éxito con SweetAlert
        Swal.fire({
            title: 'Producto Eliminado',
            text: 'El producto ha sido eliminado del carrito.',
            icon: 'success'
        });
    
        // Habilitar o deshabilitar el botón de "Pagar" según si hay productos en el carrito
        const pagarButton = document.getElementById('pagar');
        if (carrito.length === 0) {
            pagarButton.setAttribute('disabled', 'true');
        }
    }
    
    // Función para actualizar el carrito en la página
    function actualizarCarrito() {
        const listaCarrito = document.getElementById('lista-carrito');
        const totalCarrito = document.getElementById('total-carrito');
        listaCarrito.innerHTML = '';
        carrito.forEach((item, index) => {
            const li = document.createElement('li');
            li.textContent = `${item.nombre} - $${item.precio}`;
            const eliminarButton = document.createElement('button');
            eliminarButton.textContent = 'Eliminar';
            eliminarButton.onclick = () => eliminarDelCarrito(index);
            li.appendChild(eliminarButton);
            listaCarrito.appendChild(li);
        });
        totalCarrito.textContent = total;
    }
    
    // Función para guardar el carrito como un archivo JSON
    function guardarCarritoComoJSON() {
        const carritoJSON = JSON.stringify({ carrito, total });
        const blob = new Blob([carritoJSON], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'carrito.json';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
    }
    
    // Función para realizar la compra y limpiar el carrito
    function realizarCompra() {
        if (carrito.length > 0) {
            // Realiza aquí la lógica de compra, por ejemplo, envío de datos al servidor, etc.
    
            // Limpia el carrito
            carrito = [];
            total = 0;
            actualizarCarrito();
            guardarCarritoEnLocalStorage();
    
            // Mostrar una alerta de éxito con SweetAlert
            Swal.fire({
                title: 'Compra Realizada',
                text: 'La compra se ha realizado con éxito.',
                icon: 'success'
            });
    
            // Deshabilitar el botón de "Pagar" después de la compra
            const pagarButton = document.getElementById('pagar');
            pagarButton.setAttribute('disabled', 'true');
        }
    }