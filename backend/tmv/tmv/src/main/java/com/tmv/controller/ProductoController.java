package com.tmv.controller;

import com.tmv.dto.ProductoDTO;
import com.tmv.dto.UsuarioDTO;
import com.tmv.model.Producto;
import com.tmv.model.Usuario;
import com.tmv.service.ProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
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
    public ProductoDTO createProduct(@RequestBody ProductoDTO productoDTO) {
        Producto producto = productoDTO.toEntity();
        return ProductoDTO.fromEntity(productoService.save(producto));
    }

    //@Override
    //@Transactional
    //public Producto update(Long id, Producto productoActualizado)

    //@Override
    //public void deleteById(Long id)

}
