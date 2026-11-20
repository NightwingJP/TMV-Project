package com.tmv.service;

import com.tmv.dto.DetallePedidoDTO;
import com.tmv.model.DetallePedido;
import com.tmv.model.Pedido;
import com.tmv.model.Producto;
import com.tmv.repository.DetallePedidoRepository;
import com.tmv.repository.PedidoRepository;
import com.tmv.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

@Service
@Primary
public class DetallePedidoServiceJPA implements DetallePedidoService {

    private final DetallePedidoRepository detallePedidoRepository;
    private final PedidoRepository pedidoRepository;
    private final ProductoRepository productoRepository;

    @Autowired
    public DetallePedidoServiceJPA(DetallePedidoRepository detallePedidoRepository,
                                   PedidoRepository pedidoRepository,
                                   ProductoRepository productoRepository) {
        this.detallePedidoRepository = detallePedidoRepository;
        this.pedidoRepository = pedidoRepository;
        this.productoRepository = productoRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public Page<DetallePedidoDTO> findAll(Pageable pageable) {
        return detallePedidoRepository.findAll(pageable).map(DetallePedidoDTO::fromEntity);
    }

    @Override
    @Transactional(readOnly = true)
    public DetallePedidoDTO findById(Long id) {
        DetallePedido detalle = detallePedidoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Detalle de pedido no encontrado con id: " + id));
        return DetallePedidoDTO.fromEntity(detalle);
    }

    @Override
    @Transactional(readOnly = true)
    public List<DetallePedidoDTO> findByPedidoId(Long idPedido) {
        return detallePedidoRepository.findByPedidoId(idPedido).stream()
                .map(DetallePedidoDTO::fromEntity)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<DetallePedidoDTO> findByProductoId(Long idProducto) {
        return detallePedidoRepository.findByProductoId(idProducto).stream()
                .map(DetallePedidoDTO::fromEntity)
                .toList();
    }

    @Override
    @Transactional
    public DetallePedidoDTO save(DetallePedidoDTO dto) {
        if (dto.getIdPedido() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El idPedido es obligatorio");
        }
        if (dto.getIdProducto() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El idProducto es obligatorio");
        }

        Pedido pedido = pedidoRepository.findById(dto.getIdPedido())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Pedido no encontrado con id: " + dto.getIdPedido()));
        Producto producto = productoRepository.findById(dto.getIdProducto())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Producto no encontrado con id: " + dto.getIdProducto()));

        BigDecimal precioUnitario = producto.getPrecio();
        BigDecimal descuento = dto.getDescuento() != null ? dto.getDescuento() : BigDecimal.ZERO;
        BigDecimal subtotal = calcularSubtotal(precioUnitario, dto.getCantidad(), descuento);

        DetallePedido detalle = new DetallePedido(
                pedido,
                producto,
                dto.getCantidad(),
                precioUnitario,
                descuento,
                subtotal
        );

        return DetallePedidoDTO.fromEntity(detallePedidoRepository.save(detalle));
    }

    @Override
    @Transactional
    public DetallePedidoDTO update(Long id, DetallePedidoDTO dto) {
        DetallePedido detalle = detallePedidoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Detalle de pedido no encontrado con id: " + id));

        if (dto.getIdPedido() != null
                && (detalle.getPedido() == null || !dto.getIdPedido().equals(detalle.getPedido().getId()))) {
            Pedido nuevoPedido = pedidoRepository.findById(dto.getIdPedido())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                            "Pedido no encontrado con id: " + dto.getIdPedido()));
            detalle.setPedido(nuevoPedido);
        }

        if (dto.getIdProducto() != null
                && (detalle.getProducto() == null || !dto.getIdProducto().equals(detalle.getProducto().getId()))) {
            Producto nuevoProducto = productoRepository.findById(dto.getIdProducto())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                            "Producto no encontrado con id: " + dto.getIdProducto()));
            detalle.setProducto(nuevoProducto);
            detalle.setPrecioUnitario(nuevoProducto.getPrecio());
        }

        if (dto.getCantidad() != null) {
            detalle.setCantidad(dto.getCantidad());
        }
        if (dto.getDescuento() != null) {
            detalle.setDescuento(dto.getDescuento());
        }

        BigDecimal subtotal = calcularSubtotal(detalle.getPrecioUnitario(), detalle.getCantidad(), detalle.getDescuento());
        detalle.setSubtotal(subtotal);

        return DetallePedidoDTO.fromEntity(detallePedidoRepository.save(detalle));
    }

    @Override
    @Transactional
    public void deleteById(Long id) {
        if (!detallePedidoRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                    "Detalle de pedido no encontrado con id: " + id);
        }
        detallePedidoRepository.deleteById(id);
    }

    private BigDecimal calcularSubtotal(BigDecimal precioUnitario, Integer cantidad, BigDecimal descuento) {
        if (cantidad == null || cantidad <= 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "La cantidad debe ser mayor a 0");
        }
        BigDecimal desc = descuento != null ? descuento : BigDecimal.ZERO;
        if (desc.compareTo(BigDecimal.ZERO) < 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El descuento no puede ser negativo");
        }

        BigDecimal subtotal = precioUnitario
                .multiply(BigDecimal.valueOf(cantidad))
                .subtract(desc)
                .setScale(2, RoundingMode.HALF_UP);

        if (subtotal.compareTo(BigDecimal.ZERO) < 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "El descuento no puede superar el valor del detalle");
        }
        return subtotal;
    }
}
