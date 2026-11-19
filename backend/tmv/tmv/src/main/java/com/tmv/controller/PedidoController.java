package com.tmv.controller;

import com.tmv.dto.PedidoDTO;
import com.tmv.service.PedidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/pedidos")
public class PedidoController {

    private final PedidoService pedidoService;

    @Autowired
    public PedidoController(PedidoService pedidoService) {
        this.pedidoService = pedidoService;
    }

    @GetMapping
    public ResponseEntity<Page<PedidoDTO>> findAll(Pageable pageable) {
        return ResponseEntity.ok(pedidoService.findAll(pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<PedidoDTO> findById(@PathVariable Long id) {
        return ResponseEntity.ok(pedidoService.findById(id));
    }

    @GetMapping("/usuario/{idUsuario}")
    public ResponseEntity<Page<PedidoDTO>> findByUsuarioId(@PathVariable Long idUsuario, Pageable pageable) {
        return ResponseEntity.ok(pedidoService.findByUsuarioId(idUsuario, pageable));
    }

    @GetMapping("/estado/{estado}")
    public ResponseEntity<Page<PedidoDTO>> findByEstado(@PathVariable String estado, Pageable pageable) {
        return ResponseEntity.ok(pedidoService.findByEstado(estado, pageable));
    }

    @PostMapping
    public ResponseEntity<PedidoDTO> create(@RequestBody PedidoDTO pedidoDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(pedidoService.save(pedidoDTO));
    }

    @PutMapping("/{id}")
    public ResponseEntity<PedidoDTO> update(@PathVariable Long id, @RequestBody PedidoDTO pedidoDTO) {
        return ResponseEntity.ok(pedidoService.update(id, pedidoDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable Long id) {
        pedidoService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
