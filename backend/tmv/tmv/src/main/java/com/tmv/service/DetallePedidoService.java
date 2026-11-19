package com.tmv.service;

import com.tmv.dto.DetallePedidoDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface DetallePedidoService {
    Page<DetallePedidoDTO> findAll(Pageable pageable);
    DetallePedidoDTO findById(Long id);
    List<DetallePedidoDTO> findByPedidoId(Long idPedido);
    List<DetallePedidoDTO> findByProductoId(Long idProducto);
    DetallePedidoDTO save(DetallePedidoDTO detallePedidoDTO);
    DetallePedidoDTO update(Long id, DetallePedidoDTO detallePedidoDTO);
    void deleteById(Long id);
}
