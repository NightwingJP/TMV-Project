//Tarjeta Adm
const formulario = document.getElementById("formAgregarProducto");
const inputImagen = document.getElementById("imagenProducto");
const vistaPrevia = document.getElementById("vistaPrevia");
const listaProductos = document.getElementById("listaProductos");
const mensaje = document.getElementById("mensajeProducto");

let imagenSeleccionada = "";

inputImagen.addEventListener("change", function () {
    const archivo = this.files[0];

    if (!archivo) return;

    if (!archivo.type.startsWith("image/")) {
        mensaje.textContent = "Selecciona un archivo de imagen válido.";
        this.value = "";
        return;
    }

    const lector = new FileReader();

    lector.onload = function (evento) {
        imagenSeleccionada = evento.target.result;
        vistaPrevia.src = imagenSeleccionada;
        mensaje.textContent = "";
    };

    lector.readAsDataURL(archivo);
});

formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const titulo = document
        .getElementById("tituloProducto").value.trim();

    const descripcion = document
        .getElementById("descripcionProducto").value.trim();

    const precio = Number(
        document.getElementById("precioProducto").value
    );

    if (!imagenSeleccionada || !titulo || !descripcion ||
        !Number.isFinite(precio) || precio <= 0) {
        mensaje.textContent =
            "Completa todos los campos y selecciona una imagen.";
        return;
    }

    const producto = {
        id: Date.now(),
        titulo: titulo,
        descripcion: descripcion,
        precio: precio,
        imagen: imagenSeleccionada
    };

    // Guardar los productos de esta sesión del navegador.
    let productos = JSON.parse(
        localStorage.getItem("productosCatalogo") || "[]"
    );

    productos.push(producto);

    try {
        localStorage.setItem(
            "productosCatalogo",
            JSON.stringify(productos)
        );
    } catch (error) {
        mensaje.textContent =
            "No se pudo guardar. La imagen podría ser demasiado grande.";
        return;
    }

    mostrarProducto(producto);

    formulario.reset();
    imagenSeleccionada = "";
    vistaPrevia.src =
        "https://placehold.co/300x200?text=Producto";

    mensaje.textContent = "¡Producto agregado al catálogo!";
});

function mostrarProducto(producto) {
    const tarjeta = document.createElement("article");
    tarjeta.className = "producto-catalogo";

    const imagen = document.createElement("img");
    imagen.src = producto.imagen;
    imagen.alt = producto.titulo;

    const titulo = document.createElement("h3");
    titulo.textContent = producto.titulo;

    const descripcion = document.createElement("p");
    descripcion.textContent = producto.descripcion;

    const precio = document.createElement("p");
    precio.className = "precio-producto";
    precio.textContent = producto.precio.toLocaleString(
        "es-CO",
        { style: "currency", currency: "COP" }
    );

    tarjeta.append(imagen, titulo, descripcion, precio);
    listaProductos.appendChild(tarjeta);
}

// Mostrar nuevamente los productos guardados.
const productosGuardados = JSON.parse(
    localStorage.getItem("productosCatalogo") || "[]"
);

productosGuardados.forEach(mostrarProducto);
