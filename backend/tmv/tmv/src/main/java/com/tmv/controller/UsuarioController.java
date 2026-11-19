package com.tmv.controller;

import com.tmv.dto.UsuarioDTO;
import com.tmv.model.Usuario;
import com.tmv.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {
    private final UsuarioService usuarioServicio;

    @Autowired
    public UsuarioController(UsuarioService usuarioServicio) {
        this.usuarioServicio = usuarioServicio;
    }

    //@Override
    //public Usuario<Usuario> findAll(Pageable pageable)

    //@Override
    //public Usuario findById(Long id)

    @PostMapping
    public UsuarioDTO createUser(@RequestBody UsuarioDTO usuarioDTO) {
        Usuario usuario = usuarioDTO.toEntity();
        return UsuarioDTO.fromEntity(usuarioServicio.save(usuario));
    }

    //@Override
    //@Transactional
    //public Usuario update(Long id, Usuario usuarioActualizado)

    //@Override
    //public void deleteById(Long id)

}