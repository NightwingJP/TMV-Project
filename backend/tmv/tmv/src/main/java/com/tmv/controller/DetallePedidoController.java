package com.tmv.controller;

import com.tmv.dto.DetallePedidoDTO;
import com.tmv.service.DetallePedidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/detalle-pedidos")
public class DetallePedidoController {

    private final DetallePedidoService detallePedidoService;

    @Autowired
    public DetallePedidoController(DetallePedidoService detallePedidoService) {
        this.detallePedidoService = detallePedidoService;
    }

    @GetMapping
    public ResponseEntity<Page<DetallePedidoDTO>> findAll(Pageable pageable) {
        return ResponseEntity.ok(detallePedidoService.findAll(pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<DetallePedidoDTO> findById(@PathVariable Long id) {
        return ResponseEntity.ok(detallePedidoService.findById(id));
    }

    @GetMapping("/pedido/{idPedido}")
    public ResponseEntity<List<DetallePedidoDTO>> findByPedidoId(@PathVariable Long idPedido) {
        return ResponseEntity.ok(detallePedidoService.findByPedidoId(idPedido));
    }

    @GetMapping("/producto/{idProducto}")
    public ResponseEntity<List<DetallePedidoDTO>> findByProductoId(@PathVariable Long idProducto) {
        return ResponseEntity.ok(detallePedidoService.findByProductoId(idProducto));
    }

    @PostMapping
    public ResponseEntity<DetallePedidoDTO> create(@RequestBody DetallePedidoDTO detallePedidoDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(detallePedidoService.save(detallePedidoDTO));
    }

    @PutMapping("/{id}")
    public ResponseEntity<DetallePedidoDTO> update(@PathVariable Long id,
                                                   @RequestBody DetallePedidoDTO detallePedidoDTO) {
        return ResponseEntity.ok(detallePedidoService.update(id, detallePedidoDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable Long id) {
        detallePedidoService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
