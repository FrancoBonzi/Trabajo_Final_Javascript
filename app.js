///Nombre y Apellido: Franco Santiago Bonzi
///DNI:45478414

// Busca la receta que vayamos ingresar
document.getElementById("btnBuscar").addEventListener("click", () => {
    const entrada = document.getElementById("inputDeBusqueda").value;

    if (entrada === "") {
        alert("Ingrese una palabra para buscar.");
        return;
    }

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${entrada}`)
        .then(res => res.json())
        .then(data => mostrarReceta(data));
});

// Muestra receta aleatoria
document.getElementById("btnBuscarRecetaAleatoria").addEventListener("click", () => {
    fetch("https://www.themealdb.com/api/json/v1/1/random.php")
        .then(res => res.json())
        .then(data => mostrarReceta(data));
});

// Muestra el resultado obtenido
function mostrarReceta(data) {
    const contenedor = document.getElementById("resultadoObtenido");

    if (!data.meals) {
        contenedor.innerHTML = "<h3>No se encontraron resultados.</h3>";
        return;
    }

    const r = data.meals[0];

    contenedor.innerHTML = `
        <h3>${r.strMeal}</h3>
        <img src="${r.strMealThumb}" width="300">
        <p><strong>Categoría:</strong> ${r.strCategory}</p>
        <p><strong>Origen:</strong> ${r.strArea}</p>
        <p><strong>Instrucciones:</strong></p>
        <p>${r.strInstructions}</p>
    `;
}

// Validación del formulario del contacto
document.getElementById("form").addEventListener("submit", (e) => {
    e.preventDefault();

    let nombre = document.getElementById("nombre").value.trim();
    let email = document.getElementById("email").value.trim();
    let mensaje = document.getElementById("mensaje").value.trim();

    let errorNombre = document.getElementById("errorNombre");
    let errorEmail = document.getElementById("errorEmail");
    let errorMensaje = document.getElementById("errorMensaje");

    errorNombre.textContent = "";
    errorEmail.textContent = "";
    errorMensaje.textContent = "";

    let valido = true;

    if (nombre === "") {
        errorNombre.textContent = "El nombre y apellido es obligatorio.";
        valido = false;
    }

    if (email === "") {
        errorEmail.textContent = "El email es obligatorio.";
        valido = false;
    } else if (!email.includes("@") || !email.includes(".")) {
        errorEmail.textContent = "Ingrese un correo válido.";
        valido = false;
    }

    if (mensaje === ""){
        errorMensaje.textContent = "El mensaje debe ser obligatorio.";
        valido = false;
    }

    if (valido) {
        alert("El formulario fue enviado correctamente!");
        document.getElementById("form").reset();
    }
});

