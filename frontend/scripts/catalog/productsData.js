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

/**
 * Obtiene la lista unificada de productos (base + productos creados en el admin vía localStorage).
 * @returns {Array} Lista completa de productos
 */
export function getProducts() {
    try {
        const stored = localStorage.getItem("productosCatalogo");
        if (!stored) return [...BASE_PRODUCTS];

        const parsed = JSON.parse(stored);
        if (!Array.isArray(parsed) || parsed.length === 0) {
            return [...BASE_PRODUCTS];
        }

        // Normalizar los productos guardados en el admin si tienen campos en español (titulo/descripcion)
        const customProducts = parsed.map((item, index) => ({
            id: item.id || `custom-${index}`,
            title: item.title || item.titulo || "Producto TMV",
            description: item.description || item.descripcion || "Sin descripción disponible.",
            price: Number(item.price || item.precio) || 0,
            image: item.image || item.imagen || "https://placehold.co/300x240?text=Producto",
            category: item.category || "General"
        }));

        return [...BASE_PRODUCTS, ...customProducts];
    } catch (e) {
        console.warn("[TMV Catalog] No se pudieron cargar productos de localStorage:", e);
        return [...BASE_PRODUCTS];
    }
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
