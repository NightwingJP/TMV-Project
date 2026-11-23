package com.tmv.service;

import com.tmv.model.Usuario;
import com.tmv.repository.PedidoRepository;
import com.tmv.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.Set;
import java.util.regex.Pattern;

@Service
@Primary
public class UsuarioServiceJPA implements UsuarioService{
    private static final int MAX_PAGE_SIZE = 50;
    private static final int MAX_EMAIL_LENGTH = 100;
    private static final Pattern EMAIL_PATTERN = Pattern.compile(
            "^[A-Za-z0-9._%+\\-]+@[A-Za-z0-9\\-]+(?:\\.[A-Za-z0-9\\-]+)*\\.[A-Za-z]{2,}$");
    private static final Set<String> CAMPOS_ORDEN_VALIDOS = Set.of(
            "id", "usuario", "email", "telefono", "direccion");

    private static final Pattern TELEFONO = Pattern.compile("^\\+?[0-9 ()-]{7,20}$");
    private static final int CONTRASENIA_MIN = 8;

    private final UsuarioRepository usuarioRepository;
    private final PedidoRepository pedidoRepository;

    @Autowired
    public UsuarioServiceJPA(UsuarioRepository usuarioRepository, PedidoRepository pedidoRepository) {
        this.usuarioRepository = usuarioRepository;
        this.pedidoRepository = pedidoRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Usuario> findAll(Pageable pageable) {
        if (pageable == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "La paginación es obligatoria");
        }
        if (pageable.getPageNumber() < 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El número de página no puede ser negativo");
        }
        if (pageable.getPageSize() <= 0 || pageable.getPageSize() > MAX_PAGE_SIZE) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "El tamaño de página debe estar entre 1 y " + MAX_PAGE_SIZE);
        }
        for (Sort.Order order : pageable.getSort()) {
            if (!CAMPOS_ORDEN_VALIDOS.contains(order.getProperty())) {
                throw new ResponseStatusException(
                        HttpStatus.BAD_REQUEST,
                        "Campo de ordenamiento no permitido: " + order.getProperty());
            }
        }
        return usuarioRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Usuario findById(Long id) {
        if (id == null || id <= 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El id debe ser un número positivo");
        }
        return usuarioRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Usuario no encontrado con id: " + id));
    }

    @Override
    @Transactional(readOnly = true)
    public Usuario findByUsuario(String usuario) {
        if (usuario == null || usuario.isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El usuario es obligatorio");
        }
        String usuarioLimpio = limpiar(usuario);
        return usuarioRepository.findByUsuarioIgnoreCase(usuarioLimpio)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Usuario no encontrado: " + usuarioLimpio));
    }

    @Override
    @Transactional(readOnly = true)
    public Usuario findByEmail(String email) {
        if (email == null || email.isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El email es obligatorio");
        }
        String emailLimpio = email.trim();
        if (emailLimpio.length() > MAX_EMAIL_LENGTH) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "El email no puede superar los " + MAX_EMAIL_LENGTH + " caracteres");
        }
        if (emailLimpio.contains("..") || !EMAIL_PATTERN.matcher(emailLimpio).matches()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El formato del email no es válido");
        }
        return usuarioRepository.findByEmailIgnoreCase(emailLimpio)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Usuario no encontrado con email: " + emailLimpio));
    }

    // Normaliza (trim, email en minúsculas), valida todos los campos y rechaza usuario o email repetidos.
    @Override
    @Transactional
    public Usuario save(Usuario usuario) {
        if (usuario == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Los datos del usuario son obligatorios");
        }
        usuario.setId(null);
        usuario.setUsuario(limpiar(usuario.getUsuario()));
        usuario.setTelefono(limpiar(usuario.getTelefono()));
        usuario.setEmail(minusculas(limpiar(usuario.getEmail())));
        usuario.setDireccion(limpiar(usuario.getDireccion()));

        validarCampos(usuario.getUsuario(), usuario.getTelefono(), usuario.getEmail(),
                usuario.getDireccion(), usuario.getContrasenia(), true);

        if (usuarioRepository.existsByUsuarioIgnoreCase(usuario.getUsuario())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "El nombre de usuario ya está en uso");
        }
        if (usuarioRepository.existsByEmailIgnoreCase(usuario.getEmail())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "El email ya está registrado");
        }
        return usuarioRepository.save(usuario);
    }

    // Actualización parcial: solo cambian los campos enviados (no nulos). Se revalidan y se
    // comprueba que usuario y email no pertenezcan a otro usuario.
    @Override
    @Transactional
    public Usuario update(Long id, Usuario cambios) {
        Usuario actual = usuarioRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario no encontrado"));

        String nombre = limpiar(cambios.getUsuario());
        String telefono = limpiar(cambios.getTelefono());
        String email = minusculas(limpiar(cambios.getEmail()));
        String direccion = limpiar(cambios.getDireccion());
        String contrasenia = cambios.getContrasenia();

        validarCampos(nombre, telefono, email, direccion, contrasenia, false);

        if (nombre != null && usuarioRepository.existsByUsuarioIgnoreCaseAndIdNot(nombre, id)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "El nombre de usuario ya está en uso");
        }
        if (email != null && usuarioRepository.existsByEmailIgnoreCaseAndIdNot(email, id)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "El email ya está registrado");
        }

        if (nombre != null) {
            actual.setUsuario(nombre);
        }
        if (telefono != null) {
            actual.setTelefono(telefono);
        }
        if (email != null) {
            actual.setEmail(email);
        }
        if (direccion != null) {
            actual.setDireccion(direccion);
        }
        if (contrasenia != null) {
            actual.setContrasenia(contrasenia);
        }
        return usuarioRepository.save(actual);
    }

    // Elimina el usuario. Si tiene pedidos se rechaza, para no romper la integridad del historial.
    @Override
    @Transactional
    public void deleteById(Long id) {
        if (!usuarioRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario no encontrado");
        }
        if (pedidoRepository.existsByUsuarioId(id)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT,
                    "No se puede eliminar un usuario que tiene pedidos asociados");
        }
        usuarioRepository.deleteById(id);
    }

    private void validarCampos(String usuario, String telefono, String email,
                               String direccion, String contrasenia, boolean requerido) {
        if ((requerido && usuario == null) || (usuario != null && (usuario.isEmpty() || usuario.length() > 50))) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El usuario es obligatorio y admite hasta 50 caracteres");
        }
        if ((requerido && telefono == null) || (telefono != null && !TELEFONO.matcher(telefono).matches())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El teléfono es obligatorio y debe tener entre 7 y 20 dígitos");
        }
        if ((requerido && email == null) || (email != null && (email.length() > 100 || !EMAIL_PATTERN.matcher(email).matches()))) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El email es obligatorio, válido y admite hasta 100 caracteres");
        }
        if ((requerido && direccion == null) || (direccion != null && (direccion.isEmpty() || direccion.length() > 255))) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "La dirección es obligatoria y admite hasta 255 caracteres");
        }
        if ((requerido && contrasenia == null)
                || (contrasenia != null && (contrasenia.length() < CONTRASENIA_MIN || contrasenia.length() > 255))) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "La contraseña es obligatoria y debe tener entre 8 y 255 caracteres");
        }
    }

    private static String limpiar(String valor) {
        return valor == null ? null : valor.trim();
    }

    private static String minusculas(String valor) {
        return valor == null ? null : valor.toLowerCase();
    }
}
