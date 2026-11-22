package com.tmv.controller;

import com.tmv.dto.UsuarioDTO;
import com.tmv.model.Usuario;
import com.tmv.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {
    private final UsuarioService usuarioServicio;

    @Autowired
    public UsuarioController(UsuarioService usuarioServicio) {
        this.usuarioServicio = usuarioServicio;
    }

    // JUAN DIAZ findAll, findById,

    //@Override
    //public Usuario<Usuario> findAll(Pageable pageable)

    //@Override
    //public Usuario findById(Long id)

    //@Override
    //public Usuario findByEmail(String email)

    // Validaciones, normalización y unicidad (usuario/email) viven en UsuarioServiceJPA.
    // Errores: 400 datos inválidos, 404 no existe, 409 usuario/email duplicado o con pedidos.

    // Crea un usuario. Responde 201 con los datos (sin contraseña).
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public UsuarioDTO createUser(@RequestBody UsuarioDTO usuarioDTO) {
        Usuario usuario = usuarioDTO.toEntity();
        return UsuarioDTO.fromEntity(usuarioServicio.save(usuario));
    }

    // Actualización parcial: solo se modifican los campos enviados.
    @PatchMapping("/{id}")
    public UsuarioDTO update(@PathVariable Long id, @RequestBody UsuarioDTO usuarioDTO) {
        return UsuarioDTO.fromEntity(usuarioServicio.update(id, usuarioDTO.toEntity()));
    }

    // Elimina un usuario. Responde 204; 409 si tiene pedidos asociados.
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteById(@PathVariable Long id) {
        usuarioServicio.deleteById(id);
    }

}
