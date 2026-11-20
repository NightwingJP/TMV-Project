package com.tmv.controller;

import com.tmv.dto.PagoDTO;
import com.tmv.service.PagoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/pagos")
public class PagoController {

    private final PagoService pagoService;

    @Autowired
    public PagoController(PagoService pagoService) {
        this.pagoService = pagoService;
    }

    @GetMapping
    public ResponseEntity<Page<PagoDTO>> findAll(Pageable pageable) {
        return ResponseEntity.ok(pagoService.findAll(pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<PagoDTO> findById(@PathVariable Long id) {
        return ResponseEntity.ok(pagoService.findById(id));
    }

    @GetMapping("/pedido/{idPedido}")
    public ResponseEntity<PagoDTO> findByPedidoId(@PathVariable Long idPedido) {
        return ResponseEntity.ok(pagoService.findByPedidoId(idPedido));
    }

    @PostMapping
    public ResponseEntity<PagoDTO> create(@RequestBody PagoDTO pagoDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(pagoService.save(pagoDTO));
    }

    @PutMapping("/{id}")
    public ResponseEntity<PagoDTO> update(@PathVariable Long id, @RequestBody PagoDTO pagoDTO) {
        return ResponseEntity.ok(pagoService.update(id, pagoDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable Long id) {
        pagoService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
