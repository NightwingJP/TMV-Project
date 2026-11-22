package com.tmv.service;

import com.tmv.model.Producto;
import com.tmv.repository.ProductoRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
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
    public Page<Producto> findAll(Pageable pageable) {
        return null;
    }

    @Override
    public Producto findById(Long id) {
        return null;
    }


    @Override
    public Producto findByCategory(String categoria) {
        return null;
    }

    // Revisa los datos y guarda el producto como activo con la fecha actual.
    // El formulario envía nombre, categoría y precio mayor que cero. Si omite el stock, queda en 0.
    @Override
    @Transactional
    public Producto save(Producto producto) {
        String nombre = producto.getNombreProducto();
        String categoria = producto.getCategoria();
        BigDecimal precio = producto.getPrecio();
        Long stock = producto.getStock();
        String imagen = producto.getImagenProducto();

        if (nombre == null || nombre.isBlank() || nombre.length() > 120) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El nombre es obligatorio y admite hasta 120 caracteres");
        }
        if (categoria == null || categoria.isBlank() || categoria.length() > 60) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "La categoría es obligatoria y admite hasta 60 caracteres");
        }
        if (precio == null || precio.signum() <= 0 || precio.stripTrailingZeros().scale() > 2
                || precio.compareTo(BigDecimal.TEN.pow(10)) >= 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El precio debe ser positivo y admitir hasta 10 enteros y 2 decimales");
        }
        if (stock == null || stock < 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El stock debe ser cero o mayor");
        }
        if (imagen != null && imagen.length() > 255) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "La imagen admite hasta 255 caracteres");
        }

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

        String nombre = cambios.getNombreProducto();
        String categoria = cambios.getCategoria();
        BigDecimal precio = cambios.getPrecio();
        Long stock = cambios.getStock();
        String imagen = cambios.getImagenProducto();
        String descripcion = cambios.getDescripcion();

        if (nombre != null && (nombre.isBlank() || nombre.length() > 120)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El nombre es obligatorio y admite hasta 120 caracteres");
        }
        if (categoria != null && (categoria.isBlank() || categoria.length() > 60)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "La categoría es obligatoria y admite hasta 60 caracteres");
        }
        if (precio != null && (precio.signum() <= 0 || precio.stripTrailingZeros().scale() > 2
                || precio.compareTo(BigDecimal.TEN.pow(10)) >= 0)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El precio debe ser positivo y admitir hasta 10 enteros y 2 decimales");
        }
        if (stock != null && stock < 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El stock debe ser cero o mayor");
        }
        if (imagen != null && imagen.length() > 255) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "La imagen admite hasta 255 caracteres");
        }

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
}
