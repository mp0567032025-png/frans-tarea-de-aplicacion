// Selecciona el formulario que permite registrar nuevas tareas.
const formulario = document.querySelector("#formulario-tarea"); // Guarda el formulario para escuchar su envío.
const entradaTarea = document.querySelector("#entrada-tarea"); // Obtiene el campo donde se escribe la tarea.
const listaTareas = document.querySelector("#lista-tareas"); // Obtiene la lista HTML donde aparecerán las tareas.
const contador = document.querySelector("#contador"); // Obtiene el elemento que muestra cuántas tareas faltan.
const estadoVacio = document.querySelector("#estado-vacio"); // Obtiene el mensaje que aparece cuando la lista está vacía.
const mensaje = document.querySelector("#mensaje"); // Obtiene el espacio para mostrar mensajes al usuario.
const botonLimpiar = document.querySelector("#limpiar-completadas"); // Obtiene el botón para borrar tareas terminadas.
let tareas = []; // Crea un arreglo vacío que guardará las tareas durante la sesión.

// Escucha el envío del formulario para agregar una nueva tarea.
formulario.addEventListener("submit", (evento) => { // Ejecuta esta función cuando se envía el formulario.
  evento.preventDefault(); // Evita que el navegador recargue la página al enviar el formulario.
  const texto = entradaTarea.value.trim(); // Lee el texto y elimina espacios sobrantes al inicio y al final.
  if (texto === "") { // Comprueba si el usuario dejó el campo vacío.
    mensaje.textContent = "Escribe una tarea antes de agregarla."; // Informa que hace falta escribir una tarea.
    entradaTarea.focus(); // Devuelve el cursor al campo de texto.
    return; // Termina la función sin crear una tarea vacía.
  } // Cierra la validación del campo vacío.
  tareas.push({ id: Date.now(), texto: texto, completada: false }); // Agrega un objeto nuevo al arreglo de tareas.
  entradaTarea.value = ""; // Limpia el campo después de agregar la tarea.
  mensaje.textContent = "¡Tarea agregada correctamente!"; // Confirma que la tarea fue creada.
  renderizarTareas(); // Actualiza la lista que ve el usuario.
  entradaTarea.focus(); // Deja listo el campo para escribir otra tarea.
}); // Termina el evento de envío del formulario.

// Dibuja nuevamente las tareas en la página usando los datos del arreglo.
function renderizarTareas() { // Declara la función que mantiene la interfaz actualizada.
  listaTareas.innerHTML = ""; // Vacía la lista antes de volver a dibujarla.
  tareas.forEach((tarea) => { // Recorre cada tarea guardada en el arreglo.
    const elemento = document.createElement("li"); // Crea un elemento de lista para la tarea actual.
    elemento.className = tarea.completada ? "tarea completada" : "tarea"; // Aplica una clase según su estado.
    const casilla = document.createElement("input"); // Crea una casilla para marcar la tarea como completada.
    casilla.type = "checkbox"; // Define el control como una casilla de verificación.
    casilla.checked = tarea.completada; // Sincroniza la casilla con el estado guardado.
    casilla.setAttribute("aria-label", "Marcar tarea como completada"); // Añade una descripción accesible a la casilla.
    casilla.addEventListener("change", () => { // Escucha cuando el usuario marca o desmarca la casilla.
      tarea.completada = casilla.checked; // Actualiza el estado de la tarea seleccionada.
      renderizarTareas(); // Redibuja la lista para reflejar el cambio.
    }); // Cierra el evento de cambio de la casilla.
    const descripcion = document.createElement("span"); // Crea un elemento para mostrar el texto de la tarea.
    descripcion.textContent = tarea.texto; // Inserta el texto como contenido seguro, sin interpretar HTML.
    const eliminar = document.createElement("button"); // Crea el botón que eliminará esta tarea.
    eliminar.type = "button"; // Evita que el botón envíe accidentalmente el formulario.
    eliminar.className = "boton-eliminar"; // Aplica los estilos visuales del botón de eliminación.
    eliminar.textContent = "Eliminar"; // Define el texto visible del botón.
    eliminar.setAttribute("aria-label", `Eliminar tarea: ${tarea.texto}`); // Explica qué tarea eliminará para lectores de pantalla.
    eliminar.addEventListener("click", () => { // Escucha cuando se presiona el botón de eliminar.
      tareas = tareas.filter((elementoTarea) => elementoTarea.id !== tarea.id); // Conserva todas las tareas excepto la seleccionada.
      mensaje.textContent = "Tarea eliminada."; // Informa que la tarea fue eliminada.
      renderizarTareas(); // Actualiza la lista después de borrar la tarea.
    }); // Cierra el evento de eliminación.
    elemento.append(casilla, descripcion, eliminar); // Añade casilla, descripción y botón al elemento de lista.
    listaTareas.appendChild(elemento); // Coloca la tarea ya construida dentro de la lista visible.
  }); // Termina el recorrido de las tareas.
  const pendientes = tareas.filter((tarea) => !tarea.completada).length; // Cuenta solamente las tareas no completadas.
  contador.textContent = `${pendientes} ${pendientes === 1 ? "pendiente" : "pendientes"}`; // Muestra el conteo con singular o plural.
  estadoVacio.hidden = tareas.length > 0; // Oculta el mensaje vacío cuando existe al menos una tarea.
  botonLimpiar.disabled = !tareas.some((tarea) => tarea.completada); // Desactiva el botón si no hay tareas completadas.
} // Termina la función que dibuja la lista.

// Escucha el botón que elimina todas las tareas completadas.
botonLimpiar.addEventListener("click", () => { // Ejecuta la limpieza cuando el usuario presiona el botón.
  tareas = tareas.filter((tarea) => !tarea.completada); // Conserva únicamente las tareas que siguen pendientes.
  mensaje.textContent = "Se eliminaron las tareas completadas."; // Muestra una confirmación de la limpieza.
  renderizarTareas(); // Actualiza la lista y el contador después de limpiar.
}); // Termina el evento del botón de limpieza.

// Dibuja el estado inicial de la aplicación al abrir la página.
renderizarTareas(); // Muestra la lista vacía y actualiza el contador al iniciar.
