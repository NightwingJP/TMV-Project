// ==========================================================================
// TMV - Administración del carrito de compras (cartManager.js)
// ==========================================================================

import { getProducts } from "./productsData.js";

const CART_STORAGE_KEY = "carritoTMV";

/**
 * Obtiene los productos guardados en el carrito.
 */
export function getCart() {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);

    if (!stored) return [];

    const parsed = JSON.parse(stored);

    if (!Array.isArray(parsed)) return [];

    return parsed.filter(
      (item) =>
        item.id !== undefined &&
        Number.isInteger(item.quantity) &&
        item.quantity > 0,
    );
  } catch (error) {
    console.warn("No se pudo cargar el carrito:", error);
    return [];
  }
}

/**
 * Guarda el carrito en localStorage.
 */
function saveCart(cart) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}

/**
 * Obtiene los productos del catálogo con sus cantidades.
 */
export function getCartItems() {
  const cart = getCart();
  const products = getProducts();

  return cart
    .map((item) => {
      const product = products.find(
        (product) => String(product.id) === String(item.id),
      );

      if (!product) return null;

      return {
        ...product,
        quantity: item.quantity,
      };
    })
    .filter((item) => item !== null);
}

/**
 * Agrega un producto al carrito.
 * Si ya existe, aumenta su cantidad en una unidad.
 */
export function addToCart(productId) {
  const products = getProducts();

  const product = products.find(
    (item) => String(item.id) === String(productId),
  );

  if (!product) return false;

  const cart = getCart();

  const existingItem = cart.find(
    (item) => String(item.id) === String(productId),
  );

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({
      id: product.id,
      quantity: 1,
    });
  }

  saveCart(cart);

  return true;
}

/**
 * Actualiza la cantidad de un producto.
 */
export function updateCartQuantity(productId, quantity) {
  const newQuantity = Number(quantity);

  if (!Number.isInteger(newQuantity) || newQuantity < 1) {
    return false;
  }

  const cart = getCart();

  const item = cart.find((product) => String(product.id) === String(productId));

  if (!item) return false;

  item.quantity = newQuantity;

  saveCart(cart);

  return true;
}

/**
 * Elimina un producto del carrito.
 */
export function removeFromCart(productId) {
  const cart = getCart();

  const updatedCart = cart.filter(
    (item) => String(item.id) !== String(productId),
  );

  if (updatedCart.length === cart.length) {
    return false;
  }

  saveCart(updatedCart);

  return true;
}
