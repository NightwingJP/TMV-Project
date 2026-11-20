package com.tmv.service;

import com.tmv.dto.PagoDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface PagoService {
    Page<PagoDTO> findAll(Pageable pageable);
    PagoDTO findById(Long id);
    PagoDTO findByPedidoId(Long idPedido);
    PagoDTO save(PagoDTO pagoDTO);
    PagoDTO update(Long id, PagoDTO pagoDTO);
    void deleteById(Long id);
}
