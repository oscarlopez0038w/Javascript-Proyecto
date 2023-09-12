
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