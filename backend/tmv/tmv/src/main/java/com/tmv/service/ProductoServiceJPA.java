package com.tmv.service;

import com.tmv.model.Producto;
import com.tmv.repository.ProductoRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

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
    @Transactional
    public Producto save(Producto producto) {
        return productoRepository.save(producto);
    }

    @Override
    public Producto update(Long id, Producto producto) {
        return null;
    }

    @Override
    public void deleteById(Long id) {

    }
}
