package com.tmv.controller;

import com.tmv.dto.ProductoDTO;
import com.tmv.model.Producto;
import com.tmv.service.ProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/productos")
public class ProductoController {
    private final ProductoService productoService;

    @Autowired
    public ProductoController(ProductoService productoService) {
        this.productoService = productoService;
    }

    // FER findAll, findById, findByCategory

    //@Override
    //public Page<Producto> findAll(Pageable pageable)

    //@Override
    //public Producto findById(Long id)

    //@Override
    //public Producto findByCategory(String categoria)


    // ANGELA mejorar logica y validaciones createProduct(), update(), deleteById()
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ProductoDTO createProduct(@RequestBody ProductoDTO productoDTO) {
        Producto producto = productoDTO.toEntity();
        return ProductoDTO.fromEntity(productoService.save(producto));
    }

    @PatchMapping("/{id}")
    public ProductoDTO update(@PathVariable Long id, @RequestBody ProductoDTO productoDTO) {
        Producto cambios = productoDTO.toEntity();
        // El constructor asigna cero al stock omitido. El servicio usa null para conservarlo.
        cambios.setStock(productoDTO.getStock());
        return ProductoDTO.fromEntity(productoService.update(id, cambios));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteById(@PathVariable Long id) {
        productoService.deleteById(id);
    }

}
