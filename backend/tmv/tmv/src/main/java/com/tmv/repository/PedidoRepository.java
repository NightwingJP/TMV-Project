package com.tmv.repository;

import com.tmv.model.Pedido;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PedidoRepository extends JpaRepository<Pedido, Long> {
    Page<Pedido> findByUsuarioId(Long idUsuario, Pageable pageable);
    Page<Pedido> findByEstado(String estado, Pageable pageable);
}
