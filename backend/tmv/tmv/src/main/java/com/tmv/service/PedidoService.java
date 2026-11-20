package com.tmv.service;

import com.tmv.dto.PedidoDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface PedidoService {
    Page<PedidoDTO> findAll(Pageable pageable);
    PedidoDTO findById(Long id);
    Page<PedidoDTO> findByUsuarioId(Long idUsuario, Pageable pageable);
    Page<PedidoDTO> findByEstado(String estado, Pageable pageable);
    PedidoDTO save(PedidoDTO pedidoDTO);
    PedidoDTO update(Long id, PedidoDTO pedidoDTO);
    void deleteById(Long id);
}
