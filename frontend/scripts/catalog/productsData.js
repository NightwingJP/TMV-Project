// ==========================================================================
// TMV - Fuente de Datos del Catálogo (productsData.js)
// ==========================================================================

/**
 * Catálogo base oficial de TMV (11 productos base)
 */
export const BASE_PRODUCTS = [
    {
        id: 1,
        title: "Balde Trapero",
        description: "Balde plástico resistente de alta durabilidad con escurridor para trapero, ideal para limpieza en hogar o negocio.",
        price: 32500,
        image: "../assets/images/products/balde trapero.webp",
        category: "Aseo y Limpieza"
    },
    {
        id: 2,
        title: "Cepillo para Ropa",
        description: "Cepillo ergonómico con cerdas de alta densidad para lavado profundo y cuidado de prendas y textiles.",
        price: 5500,
        image: "../assets/images/products/cepillo-ropa.jpg",
        category: "Aseo y Limpieza"
    },
    {
        id: 3,
        title: "Clorox",
        description: "Desinfectante blanqueador con máxima protección para desinfección profunda de pisos, baños y superficies.",
        price: 2800,
        image: "../assets/images/products/clorox.jpeg",
        category: "Desinfectantes"
    },
    {
        id: 4,
        title: "Detergente en Polvo",
        description: "Detergente multiusos con fórmula activa que remueve grasa y manchas difíciles sin maltratar las telas.",
        price: 8500,
        image: "../assets/images/products/detergentePolvo.png",
        category: "Detergentes"
    },
    {
        id: 5,
        title: "Escoba",
        description: "Escoba de cerdas suaves y resistentes con mango ergonómico, apta para todo tipo de pisos interiores y exteriores.",
        price: 8500,
        image: "../assets/images/products/escoba.jpg",
        category: "Aseo y Limpieza"
    },
    {
        id: 6,
        title: "Fabuloso",
        description: "Limpiador multiusos con fragancia floral de larga duración que proporciona brillo y limpieza profunda.",
        price: 6500,
        image: "../assets/images/products/fabuloso.jpg",
        category: "Desinfectantes"
    },
    {
        id: 7,
        title: "Guantes de Limpieza",
        description: "Guantes de látex reforzados con textura antideslizante para protección y comodidad en tareas de limpieza.",
        price: 7200,
        image: "../assets/images/products/guantes-limpieza.jpg",
        category: "Protección"
    },
    {
        id: 8,
        title: "Jabón en Barra",
        description: "Jabón tradicional multiusos de gran rendimiento, excelente poder desmanchador y suavidad con las manos.",
        price: 2200,
        image: "../assets/images/products/jabon-barra.jpg",
        category: "Detergentes"
    },
    {
        id: 9,
        title: "Lavaloza",
        description: "Crema lavaloza con acción desengrasante instantánea y aroma fresco que rinde más lavadas por porción.",
        price: 4800,
        image: "../assets/images/products/lavaloza.webp",
        category: "Cocina"
    },
    {
        id: 10,
        title: "Trapero",
        description: "Trapero de microfibra y algodón superabsorbente con rosca universal para limpieza rápida y sin pelusa.",
        price: 9500,
        image: "../assets/images/products/trapero.jpeg",
        category: "Aseo y Limpieza"
    },
    {
        id: 11,
        title: "Wipe Paño Multiusos",
        description: "Paño absorbente de secado rápido, lavable y reutilizable para limpieza de polvo, grasa y líquidos en cualquier superficie.",
        price: 3500,
        image: "../assets/images/products/wipe.jpg",
        category: "Aseo y Limpieza"
    }
];

export const STORAGE_KEY = "productosCatalogo";

/**
 * Obtiene exclusivamente los productos personalizados creados en el admin vía localStorage.
 * @returns {Array} Lista de productos personalizados
 */
export function getCustomProducts() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) return [];

        const parsed = JSON.parse(stored);
        if (!Array.isArray(parsed) || parsed.length === 0) {
            return [];
        }

        // Normalizar los productos guardados en el admin con campos consistentes
        return parsed.map((item, index) => ({
            id: item.id || `custom-${index}`,
            title: item.title || item.titulo || "Producto TMV",
            description: item.description || item.descripcion || "Sin descripción disponible.",
            price: Number(item.price || item.precio) || 0,
            image: item.image || item.imagen || "https://placehold.co/300x240?text=Producto",
            category: item.category || item.categoria || "General",
            isCustom: true
        }));
    } catch (e) {
        console.warn("[TMV Catalog] No se pudieron cargar productos de localStorage:", e);
        return [];
    }
}

/**
 * Obtiene la lista unificada de productos (base + productos creados en el admin vía localStorage).
 * Los productos hardcodeados BASE_PRODUCTS siempre se mantienen.
 * @returns {Array} Lista completa de productos
 */
export function getProducts() {
    const baseWithFlag = BASE_PRODUCTS.map((p) => ({ ...p, isCustom: false }));
    const custom = getCustomProducts();
    return [...baseWithFlag, ...custom];
}

/**
 * Guarda un nuevo producto personalizado en localStorage.
 * @param {Object} productData
 * @returns {Object} Producto guardado con ID asignado
 */
export function saveProduct(productData) {
    const custom = getCustomProducts();
    const newProduct = {
        id: productData.id || Date.now(),
        title: productData.title || productData.titulo || "Nuevo Producto",
        description: productData.description || productData.descripcion || "Sin descripción.",
        price: Number(productData.price || productData.precio) || 0,
        image: productData.image || productData.imagen || "https://placehold.co/300x240?text=Producto",
        category: productData.category || productData.categoria || "General",
        isCustom: true
    };

    custom.push(newProduct);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(custom));
    notifyProductsUpdated();
    return newProduct;
}

/**
 * Elimina un producto de localStorage por su ID.
 * Solo elimina productos personalizados; los productos base hardcodeados nunca se modifican.
 * @param {string|number} productId
 * @returns {boolean} true si se eliminó, false si no se encontró o es base
 */
export function deleteProduct(productId) {
    const custom = getCustomProducts();
    const filtered = custom.filter((item) => String(item.id) !== String(productId));

    if (filtered.length !== custom.length) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
        notifyProductsUpdated();
        return true;
    }
    return false;
}

/**
 * Emite eventos para sincronizar los componentes y páginas en tiempo real.
 */
export function notifyProductsUpdated() {
    const allProducts = getProducts();
    const event = new CustomEvent("catalog:products-updated", {
        bubbles: true,
        detail: { products: allProducts }
    });
    document.dispatchEvent(event);
    window.dispatchEvent(event);
}

// Escuchar cambios en localStorage desde otras pestañas o ventanas del navegador
if (typeof window !== "undefined") {
    window.addEventListener("storage", (e) => {
        if (e.key === STORAGE_KEY) {
            notifyProductsUpdated();
        }
    });
}

/**
 * Formatea un valor numérico a moneda colombiana (COP).
 * @param {number} price
 * @returns {string} Formato tipo "$ 32.500"
 */
export function formatPrice(price) {
    if (typeof price !== "number" || isNaN(price)) {
        return "$ 0";
    }
    return new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        maximumFractionDigits: 0
    }).format(price);
}
