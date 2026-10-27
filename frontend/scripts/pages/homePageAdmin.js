// ==========================================================================
// TMV - Panel de Administración (homePageAdmin.js)
// Gestión de formulario para agregar/eliminar productos sincronizados con el catálogo
// ==========================================================================

import {
    getCustomProducts,
    saveProduct,
    deleteProduct,
    formatPrice
} from "../catalog/productsData.js";

const formulario = document.getElementById("formAgregarProducto");
const inputImagen = document.getElementById("imagenProducto");
const vistaPrevia = document.getElementById("vistaPrevia");
const listaProductos = document.getElementById("listaProductos");
const mensaje = document.getElementById("mensajeProducto");
const selectCategoria = document.getElementById("categoriaProducto");

const PLACEHOLDER_IMAGE = "https://placehold.co/300x240?text=TMV+Producto";
let imagenSeleccionada = "";

/**
 * Comprime una imagen a dimensiones razonables para evitar exceder la cuota de localStorage.
 * @param {File} archivo
 * @param {Function} callback (dataUrl)
 */
function comprimirImagen(archivo, callback) {
    const lector = new FileReader();

    lector.onload = function (evento) {
        const img = new Image();
        img.onload = function () {
            const canvas = document.createElement("canvas");
            const maxDimension = 500;
            let width = img.width;
            let height = img.height;

            if (width > height) {
                if (width > maxDimension) {
                    height = Math.round((height * maxDimension) / width);
                    width = maxDimension;
                }
            } else {
                if (height > maxDimension) {
                    width = Math.round((width * maxDimension) / height);
                    height = maxDimension;
                }
            }

            canvas.width = width;
            canvas.height = height;

            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, width, height);

            const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.75);
            callback(compressedDataUrl);
        };

        img.onerror = function () {
            callback(PLACEHOLDER_IMAGE);
        };

        img.src = evento.target.result;
    };

    lector.readAsDataURL(archivo);
}

// 1. Manejo del input de imagen
if (inputImagen && vistaPrevia) {
    inputImagen.addEventListener("change", function () {
        const archivo = this.files[0];
        if (!archivo) return;

        if (!archivo.type.startsWith("image/")) {
            if (mensaje) mensaje.textContent = "Selecciona un archivo de imagen válido.";
            this.value = "";
            return;
        }

        comprimirImagen(archivo, (dataUrl) => {
            imagenSeleccionada = dataUrl;
            vistaPrevia.src = dataUrl;
            if (mensaje) mensaje.textContent = "";
        });
    });
}

// 2. Manejo del envío del formulario para agregar producto
if (formulario) {
    formulario.addEventListener("submit", function (evento) {
        evento.preventDefault();

        const titulo = document.getElementById("tituloProducto")?.value.trim();
        const descripcion = document.getElementById("descripcionProducto")?.value.trim();
        const precio = Number(document.getElementById("precioProducto")?.value);
        const categoria = selectCategoria?.value || "General";

        if (!titulo || !descripcion || !Number.isFinite(precio) || precio <= 0) {
            if (mensaje) {
                mensaje.style.color = "#dc3545";
                mensaje.textContent = "Por favor completa todos los campos con valores válidos.";
            }
            return;
        }

        try {
            // Guardar producto sincronizado con productsData
            const nuevoProducto = saveProduct({
                title: titulo,
                description: descripcion,
                price: precio,
                image: imagenSeleccionada || PLACEHOLDER_IMAGE,
                category: categoria
            });

            // Limpiar formulario y vista previa
            formulario.reset();
            imagenSeleccionada = "";
            if (vistaPrevia) vistaPrevia.src = PLACEHOLDER_IMAGE;

            if (mensaje) {
                mensaje.style.color = "#155724";
                mensaje.textContent = `¡Producto "${nuevoProducto.title}" agregado con éxito al catálogo!`;
                setTimeout(() => {
                    if (mensaje.textContent.includes("agregado con éxito")) {
                        mensaje.textContent = "";
                    }
                }, 4000);
            }

            renderizarProductosAdmin();
        } catch (error) {
            console.error("[TMV Admin] Error al guardar producto:", error);
            if (mensaje) {
                mensaje.style.color = "#dc3545";
                mensaje.textContent = "No se pudo guardar el producto. La memoria local podría estar llena.";
            }
        }
    });
}

/**
 * Renderiza la lista de productos personalizados agregados por el administrador.
 * Cada tarjeta incluye la información del producto y un botón para eliminarlo.
 */
export function renderizarProductosAdmin() {
    if (!listaProductos) return;

    listaProductos.innerHTML = "";
    const customProducts = getCustomProducts();

    if (customProducts.length === 0) {
        listaProductos.innerHTML = `
            <div class="admin-empty-state">
                <p><strong>No has agregado productos personalizados aún.</strong></p>
                <small>Los productos que agregues desde el formulario superior aparecerán aquí y en la tienda pública (productos.html). Los 11 productos base siempre se mantienen.</small>
            </div>
        `;
        return;
    }

    const fragment = document.createDocumentFragment();

    customProducts.forEach((producto) => {
        const tarjeta = document.createElement("article");
        tarjeta.className = "producto-catalogo";
        tarjeta.setAttribute("data-product-id", String(producto.id));

        // Imagen
        const imagen = document.createElement("img");
        imagen.src = producto.image || producto.imagen || PLACEHOLDER_IMAGE;
        imagen.alt = producto.title || producto.titulo || "Producto TMV";
        imagen.onerror = function () {
            this.onerror = null;
            this.src = PLACEHOLDER_IMAGE;
        };

        // Categoría
        const categoriaTag = document.createElement("span");
        categoriaTag.className = "producto-categoria-tag";
        categoriaTag.textContent = producto.category || producto.categoria || "General";

        // Título
        const titulo = document.createElement("h3");
        titulo.textContent = producto.title || producto.titulo || "Producto sin título";

        // Descripción
        const descripcion = document.createElement("p");
        descripcion.textContent = producto.description || producto.descripcion || "Sin descripción disponible.";

        // Precio
        const precio = document.createElement("p");
        precio.className = "precio-producto";
        precio.textContent = formatPrice(Number(producto.price || producto.precio) || 0);

        // Botón Eliminar
        const btnEliminar = document.createElement("button");
        btnEliminar.type = "button";
        btnEliminar.className = "btn-eliminar-producto";
        btnEliminar.innerHTML = `
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
            <span>Eliminar del catálogo</span>
        `;

        btnEliminar.addEventListener("click", () => {
            const confirmado = window.confirm(
                `¿Deseas eliminar el producto "${producto.title || producto.titulo}"? Esta acción lo borrará tanto de este panel como de la página pública de productos.`
            );

            if (confirmado) {
                const eliminado = deleteProduct(producto.id);
                if (eliminado) {
                    renderizarProductosAdmin();
                    if (mensaje) {
                        mensaje.style.color = "#856404";
                        mensaje.textContent = `El producto "${producto.title || producto.titulo}" fue eliminado de ambas páginas.`;
                        setTimeout(() => {
                            if (mensaje.textContent.includes("fue eliminado")) {
                                mensaje.textContent = "";
                            }
                        }, 4000);
                    }
                }
            }
        });

        tarjeta.append(imagen, categoriaTag, titulo, descripcion, precio, btnEliminar);
        fragment.appendChild(tarjeta);
    });

    listaProductos.appendChild(fragment);
}

// 3. Render inicial al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    renderizarProductosAdmin();
});

// Sincronizar en tiempo real cuando se actualice el catálogo (por eventos locales o desde otra pestaña)
document.addEventListener("catalog:products-updated", () => {
    renderizarProductosAdmin();
});
