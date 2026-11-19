package com.tmv.service;

import com.tmv.model.Usuario;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

// aqui imetodos que no estan implementados por JPA, usar bien las palabras clave
public interface UsuarioService {
    Page<Usuario> findAll(Pageable pageable);
    Usuario findById(Long id);
    Usuario save(Usuario usuario);
    Usuario update(Long id, Usuario usuario);
    void deleteById(Long id);
}
