package com.tmv.service;

import com.tmv.model.Usuario;
import com.tmv.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Primary
public class UsuarioServiceJPA implements UsuarioService{
    private final UsuarioRepository usuarioRepository;

    @Autowired
    public UsuarioServiceJPA(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @Override
    public Page<Usuario> findAll(Pageable pageable) {
        return null;
    }

    @Override
    public Usuario findById(Long id) {
        return null;
    }

    @Override
    @Transactional
    public Usuario save(Usuario envio) {
        return usuarioRepository.save(envio);
    }

    @Override
    public Usuario update(Long id, Usuario usuario) {
        return null;
    }

    @Override
    public void deleteById(Long id) {

    }
}
