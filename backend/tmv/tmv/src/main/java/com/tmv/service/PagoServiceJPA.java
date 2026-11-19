package com.tmv.service;

import com.tmv.dto.PagoDTO;
import com.tmv.model.Pago;
import com.tmv.model.Pedido;
import com.tmv.repository.PagoRepository;
import com.tmv.repository.PedidoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
@Primary
public class PagoServiceJPA implements PagoService {

    private final PagoRepository pagoRepository;
    private final PedidoRepository pedidoRepository;

    @Autowired
    public PagoServiceJPA(PagoRepository pagoRepository, PedidoRepository pedidoRepository) {
        this.pagoRepository = pagoRepository;
        this.pedidoRepository = pedidoRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public Page<PagoDTO> findAll(Pageable pageable) {
        return pagoRepository.findAll(pageable).map(PagoDTO::fromEntity);
    }

    @Override
    @Transactional(readOnly = true)
    public PagoDTO findById(Long id) {
        Pago pago = pagoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Pago no encontrado con id: " + id));
        return PagoDTO.fromEntity(pago);
    }

    @Override
    @Transactional(readOnly = true)
    public PagoDTO findByPedidoId(Long idPedido) {
        Pago pago = pagoRepository.findByPedidoId(idPedido)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Pago no encontrado para el pedido con id: " + idPedido));
        return PagoDTO.fromEntity(pago);
    }

    @Override
    @Transactional
    public PagoDTO save(PagoDTO pagoDTO) {
        if (pagoDTO.getIdPedido() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El idPedido es obligatorio");
        }
        if (pagoDTO.getFormaPago() == null || pagoDTO.getFormaPago().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "La forma de pago es obligatoria");
        }
        if (pagoRepository.existsByPedidoId(pagoDTO.getIdPedido())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "El pedido ya tiene un pago registrado");
        }

        Pedido pedido = pedidoRepository.findById(pagoDTO.getIdPedido())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Pedido no encontrado con id: " + pagoDTO.getIdPedido()));

        Pago pago = new Pago(pedido, pagoDTO.getFormaPago());
        return PagoDTO.fromEntity(pagoRepository.save(pago));
    }

    @Override
    @Transactional
    public PagoDTO update(Long id, PagoDTO pagoDTO) {
        Pago pago = pagoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Pago no encontrado con id: " + id));

        if (pagoDTO.getIdPedido() != null
                && (pago.getPedido() == null || !pagoDTO.getIdPedido().equals(pago.getPedido().getId()))) {
            if (pagoRepository.existsByPedidoId(pagoDTO.getIdPedido())) {
                throw new ResponseStatusException(HttpStatus.CONFLICT, "El pedido ya tiene un pago registrado");
            }
            Pedido nuevoPedido = pedidoRepository.findById(pagoDTO.getIdPedido())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                            "Pedido no encontrado con id: " + pagoDTO.getIdPedido()));
            pago.setPedido(nuevoPedido);
        }

        if (pagoDTO.getFormaPago() != null) {
            if (pagoDTO.getFormaPago().isBlank()) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "La forma de pago no puede estar vacia");
            }
            pago.setFormaPago(pagoDTO.getFormaPago());
        }

        return PagoDTO.fromEntity(pagoRepository.save(pago));
    }

    @Override
    @Transactional
    public void deleteById(Long id) {
        if (!pagoRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Pago no encontrado con id: " + id);
        }
        pagoRepository.deleteById(id);
    }
}
