package com.tmv.config;

import com.tmv.model.Producto;
import com.tmv.model.Rol;
import com.tmv.model.Usuario;
import com.tmv.repository.ProductoRepository;
import com.tmv.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UsuarioRepository usuarioRepository;
    private final ProductoRepository productoRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${admin.email:admin@tmv.com}")
    private String adminEmail;

    @Value("${admin.password:Admin#2026}")
    private String adminPassword;

    public DataInitializer(UsuarioRepository usuarioRepository,
                           ProductoRepository productoRepository,
                           PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.productoRepository = productoRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        String emailAdmin = adminEmail.trim().toLowerCase();
        if (!usuarioRepository.existsByEmailIgnoreCase(emailAdmin)) {
            Usuario admin = new Usuario(
                    "Administrador TMV",
                    Rol.ADMIN,
                    "3000000000",
                    emailAdmin,
                    "Sede Principal TMV",
                    passwordEncoder.encode(adminPassword)
            );
            usuarioRepository.save(admin);
        }

        if (productoRepository.count() == 0) {
            LocalDateTime ahora = LocalDateTime.now();
            List<Producto> base = List.of(
                    new Producto("Balde Trapero", new BigDecimal("32500.00"),
                            "Balde plástico resistente de alta durabilidad con escurridor para trapero, ideal para limpieza en hogar o negocio.",
                            "../assets/images/products/balde trapero.webp", "Aseo y Limpieza", ahora, 50L, null),
                    new Producto("Cepillo para Ropa", new BigDecimal("5500.00"),
                            "Cepillo ergonómico con cerdas de alta densidad para lavado profundo y cuidado de prendas y textiles.",
                            "../assets/images/products/cepillo-ropa.jpg", "Aseo y Limpieza", ahora, 50L, null),
                    new Producto("Clorox", new BigDecimal("2800.00"),
                            "Desinfectante blanqueador con máxima protección para desinfección profunda de pisos, baños y superficies.",
                            "../assets/images/products/clorox.jpeg", "Desinfectantes", ahora, 50L, null),
                    new Producto("Detergente en Polvo", new BigDecimal("8500.00"),
                            "Detergente multiusos con fórmula activa que remueve grasa y manchas difíciles sin maltratar las telas.",
                            "../assets/images/products/detergentePolvo.png", "Detergentes", ahora, 50L, null),
                    new Producto("Escoba", new BigDecimal("8500.00"),
                            "Escoba de cerdas suaves y resistentes con mango ergonómico, apta para todo tipo de pisos interiores y exteriores.",
                            "../assets/images/products/escoba.jpg", "Aseo y Limpieza", ahora, 50L, null),
                    new Producto("Fabuloso", new BigDecimal("6500.00"),
                            "Limpiador multiusos con fragancia floral de larga duración que proporciona brillo y limpieza profunda.",
                            "../assets/images/products/fabuloso.jpg", "Desinfectantes", ahora, 50L, null),
                    new Producto("Guantes de Limpieza", new BigDecimal("7200.00"),
                            "Guantes de látex reforzados con textura antideslizante para protección y comodidad en tareas de limpieza.",
                            "../assets/images/products/guantes-limpieza.jpg", "Protección", ahora, 50L, null),
                    new Producto("Jabón en Barra", new BigDecimal("2200.00"),
                            "Jabón tradicional multiusos de gran rendimiento, excelente poder desmanchador y suavidad con las manos.",
                            "../assets/images/products/jabon-barra.jpg", "Detergentes", ahora, 50L, null),
                    new Producto("Lavaloza", new BigDecimal("4800.00"),
                            "Crema lavaloza con acción desengrasante instantánea y aroma fresco que rinde más lavadas por porción.",
                            "../assets/images/products/lavaloza.webp", "Cocina", ahora, 50L, null),
                    new Producto("Trapero", new BigDecimal("9500.00"),
                            "Trapero de microfibra y algodón superabsorbente con rosca universal para limpieza rápida y sin pelusa.",
                            "../assets/images/products/trapero.jpeg", "Aseo y Limpieza", ahora, 50L, null),
                    new Producto("Wipe Paño Multiusos", new BigDecimal("3500.00"),
                            "Paño absorbente de secado rápido, lavable y reutilizable para limpieza de polvo, grasa y líquidos en cualquier superficie.",
                            "../assets/images/products/wipe.jpg", "Aseo y Limpieza", ahora, 50L, null)
            );
            productoRepository.saveAll(base);
        }
    }
}
