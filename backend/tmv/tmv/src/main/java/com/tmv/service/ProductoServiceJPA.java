package com.tmv.service;

import com.tmv.model.Producto;
import com.tmv.repository.ProductoRepository;
import org.springframework.context.annotation.Primary;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Service
@Primary
public class ProductoServiceJPA implements ProductoService{
    private final ProductoRepository productoRepository;

    public ProductoServiceJPA(ProductoRepository productoRepository) {
        this.productoRepository = productoRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Producto> findAll(Pageable pageable) {
        return productoRepository.findByFechaSalidaIsNull(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Producto findById(Long id) {
        if (id == null || id <= 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El id debe ser un número positivo");
        }
        return productoRepository.findByIdAndFechaSalidaIsNull(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Producto no encontrado"));
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Producto> findByCategory(String categoria, Pageable pageable) {
        if (categoria == null || categoria.isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "La categoría es obligatoria");
        }
        return productoRepository.findByCategoriaIgnoreCaseAndFechaSalidaIsNull(categoria.trim(), pageable);
    }

    // Revisa los datos y guarda el producto como activo con la fecha actual.
    // El formulario envía nombre, categoría y precio mayor que cero. Si omite el stock, queda en 0.
    @Override
    @Transactional
    public Producto save(Producto producto) {
        validarCampos(
                producto.getNombreProducto(),
                producto.getCategoria(),
                producto.getPrecio(),
                producto.getStock(),
                producto.getImagenProducto(),
                true
        );

        producto.setFechaIngreso(LocalDateTime.now());
        producto.setFechaSalida(null);
        return productoRepository.save(producto);
    }

    // Busca el producto por ID y revisa los cambios antes de aplicarlos.
    // El formulario puede enviar solo el precio por ejemplo, y los demás datos se conservarían.
    @Override
    @Transactional
    public Producto update(Long id, Producto cambios) {
        Producto producto = productoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Producto no encontrado"));

        if (producto.getFechaSalida() != null) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "No se puede actualizar un producto retirado");
        }

        String nombre = cambios.getNombreProducto();
        String categoria = cambios.getCategoria();
        BigDecimal precio = cambios.getPrecio();
        Long stock = cambios.getStock();
        String imagen = cambios.getImagenProducto();
        String descripcion = cambios.getDescripcion();

        validarCampos(nombre, categoria, precio, stock, imagen, false);

        if (nombre != null) {
            producto.setNombreProducto(nombre);
        }
        if (categoria != null) {
            producto.setCategoria(categoria);
        }
        if (precio != null) {
            producto.setPrecio(precio);
        }
        if (stock != null) {
            producto.setStock(stock);
        }
        if (imagen != null) {
            producto.setImagenProducto(imagen);
        }
        if (descripcion != null) {
            producto.setDescripcion(descripcion);
        }

        return producto;
    }

    // Guarda la fecha del primer retiro y conserva el producto para el historial.
    // Si el retiro se confirma, el frontend puede quitar el producto de la lista de activos.
    @Override
    @Transactional
    public void deleteById(Long id) {
        Producto producto = productoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Producto no encontrado"));
        if (producto.getFechaSalida() == null) {
            producto.setFechaSalida(LocalDateTime.now());
        }
    }

    private void validarCampos(String nombre, String categoria, BigDecimal precio,
                               Long stock, String imagen, boolean requerido) {
        if ((requerido && nombre == null) || (nombre != null && (nombre.isBlank() || nombre.length() > 120))) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El nombre es obligatorio y admite hasta 120 caracteres");
        }
        if ((requerido && categoria == null) || (categoria != null && (categoria.isBlank() || categoria.length() > 60))) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "La categoría es obligatoria y admite hasta 60 caracteres");
        }
        if ((requerido && precio == null) || (precio != null && (precio.signum() <= 0
                || precio.stripTrailingZeros().scale() > 2 || precio.compareTo(BigDecimal.TEN.pow(10)) >= 0))) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El precio debe ser positivo y admitir hasta 10 enteros y 2 decimales");
        }
        if ((requerido && stock == null) || (stock != null && stock < 0)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El stock debe ser cero o mayor");
        }
        if (imagen != null && imagen.length() > 255) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "La imagen admite hasta 255 caracteres");
        }
    }
}
