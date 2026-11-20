package com.tmv.repository;

import com.tmv.model.DetallePedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DetallePedidoRepository extends JpaRepository<DetallePedido, Long> {
    List<DetallePedido> findByPedidoId(Long idPedido);
    List<DetallePedido> findByProductoId(Long idProducto);
}
