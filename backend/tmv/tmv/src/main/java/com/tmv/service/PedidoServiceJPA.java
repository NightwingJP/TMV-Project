package com.tmv.service;

import com.tmv.dto.PedidoDTO;
import com.tmv.model.Pedido;
import com.tmv.model.Usuario;
import com.tmv.repository.PedidoRepository;
import com.tmv.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Service
@Primary
public class PedidoServiceJPA implements PedidoService {

    private final PedidoRepository pedidoRepository;
    private final UsuarioRepository usuarioRepository;

    @Autowired
    public PedidoServiceJPA(PedidoRepository pedidoRepository, UsuarioRepository usuarioRepository) {
        this.pedidoRepository = pedidoRepository;
        this.usuarioRepository = usuarioRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public Page<PedidoDTO> findAll(Pageable pageable) {
        return pedidoRepository.findAll(pageable).map(PedidoDTO::fromEntity);
    }

    @Override
    @Transactional(readOnly = true)
    public PedidoDTO findById(Long id) {
        Pedido pedido = pedidoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Pedido no encontrado con id: " + id));
        return PedidoDTO.fromEntity(pedido);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<PedidoDTO> findByUsuarioId(Long idUsuario, Pageable pageable) {
        return pedidoRepository.findByUsuarioId(idUsuario, pageable).map(PedidoDTO::fromEntity);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<PedidoDTO> findByEstado(String estado, Pageable pageable) {
        return pedidoRepository.findByEstado(estado, pageable).map(PedidoDTO::fromEntity);
    }

    @Override
    @Transactional
    public PedidoDTO save(PedidoDTO pedidoDTO) {
        if (pedidoDTO.getIdUsuario() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El idUsuario es obligatorio");
        }
        if (pedidoDTO.getEstado() == null || pedidoDTO.getEstado().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El estado es obligatorio");
        }
        if (pedidoDTO.getDireccionEnvio() == null || pedidoDTO.getDireccionEnvio().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "La direccion de envio es obligatoria");
        }

        Usuario usuario = usuarioRepository.findById(pedidoDTO.getIdUsuario())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Usuario no encontrado con id: " + pedidoDTO.getIdUsuario()));

        LocalDateTime fechaPedido = pedidoDTO.getFechaPedido() != null ? pedidoDTO.getFechaPedido() : LocalDateTime.now();
        BigDecimal totalPedido = pedidoDTO.getTotalPedido() != null ? pedidoDTO.getTotalPedido() : BigDecimal.ZERO;
        BigDecimal descuento = pedidoDTO.getDescuento() != null ? pedidoDTO.getDescuento() : BigDecimal.ZERO;

        Pedido pedido = new Pedido(
                usuario,
                fechaPedido,
                pedidoDTO.getEstado(),
                totalPedido,
                pedidoDTO.getDireccionEnvio(),
                pedidoDTO.getObservacion(),
                descuento
        );

        return PedidoDTO.fromEntity(pedidoRepository.save(pedido));
    }

    @Override
    @Transactional
    public PedidoDTO update(Long id, PedidoDTO pedidoDTO) {
        Pedido pedido = pedidoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Pedido no encontrado con id: " + id));

        if (pedidoDTO.getIdUsuario() != null
                && (pedido.getUsuario() == null || !pedidoDTO.getIdUsuario().equals(pedido.getUsuario().getId()))) {
            Usuario nuevoUsuario = usuarioRepository.findById(pedidoDTO.getIdUsuario())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                            "Usuario no encontrado con id: " + pedidoDTO.getIdUsuario()));
            pedido.setUsuario(nuevoUsuario);
        }

        if (pedidoDTO.getFechaPedido() != null) {
            pedido.setFechaPedido(pedidoDTO.getFechaPedido());
        }
        if (pedidoDTO.getEstado() != null) {
            if (pedidoDTO.getEstado().isBlank()) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El estado no puede estar vacio");
            }
            pedido.setEstado(pedidoDTO.getEstado());
        }
        if (pedidoDTO.getTotalPedido() != null) {
            pedido.setTotalPedido(pedidoDTO.getTotalPedido());
        }
        if (pedidoDTO.getDireccionEnvio() != null) {
            if (pedidoDTO.getDireccionEnvio().isBlank()) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "La direccion de envio no puede estar vacia");
            }
            pedido.setDireccionEnvio(pedidoDTO.getDireccionEnvio());
        }
        if (pedidoDTO.getDescuento() != null) {
            pedido.setDescuento(pedidoDTO.getDescuento());
        }
        pedido.setObservacion(pedidoDTO.getObservacion());

        return PedidoDTO.fromEntity(pedidoRepository.save(pedido));
    }

    @Override
    @Transactional
    public void deleteById(Long id) {
        if (!pedidoRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Pedido no encontrado con id: " + id);
        }
        pedidoRepository.deleteById(id);
    }
}
