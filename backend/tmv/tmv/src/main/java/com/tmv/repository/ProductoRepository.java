package com.tmv.repository;

import com.tmv.model.Producto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {
    Page<Producto> findByFechaSalidaIsNull(Pageable pageable);
    Optional<Producto> findByIdAndFechaSalidaIsNull(Long id);
    Page<Producto> findByCategoriaIgnoreCaseAndFechaSalidaIsNull(String categoria, Pageable pageable);
}
