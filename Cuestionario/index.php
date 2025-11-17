<?php
require_once 'config.php';
require_once 'functions.php';
// Carga opcional de Airtable
if (file_exists(__DIR__ . '/airtable.php')) {
    require_once __DIR__ . '/airtable.php';
}

// Verificación temprana de configuración Airtable
$airtable_configured = function_exists('airtable_is_configured') ? airtable_is_configured() : false;

// Procesar registro
if ($_POST) {
    if (!$airtable_configured) {
        // Modo sin base de datos: continuar sin Airtable
        $nombre = limpiarDatos($_POST['nombre']);
        $email = limpiarDatos($_POST['email']);

        if (empty($nombre) || empty($email)) {
            $error = "Todos los campos son obligatorios";
        } elseif (!validarEmail($email)) {
            $error = "Email inválido";
        } else {
            $_SESSION['usuario'] = ['nombre' => $nombre, 'email' => $email];
            $_SESSION['usuario_verificado'] = true;
            header('Location: wizard.php');
            exit;
        }
    } else {
        $nombre = limpiarDatos($_POST['nombre']);
        $email = limpiarDatos($_POST['email']);

        if (empty($nombre) || empty($email)) {
            $error = "Todos los campos son obligatorios";
        } elseif (!validarEmail($email)) {
            $error = "Email inválido";
        } else {
            try {
                $existente = airtable_get_usuario_by_email($email);
                if ($existente) {
                    $error = "Este email ya está registrado";
                } else {
                    $token = generarToken();
                    list($usuarios) = airtable_tables();
                    $fields = [
                        'nombre' => $nombre,
                        'email' => $email,
                        'token_verificacion' => $token,
                        'email_verificado' => false,
                        'fecha_registro' => date('c')
                    ];
                    airtable_create($usuarios, $fields);
                    if (enviarEmailVerificacion($email, $token)) {
                        $mensaje = "Registro exitoso. Por favor verifica tu email para continuar.";
                    } else {
                        // Fallback: mostrar enlace directo de verificación
                        $link = construirEnlaceVerificacion($token);
                        $mensaje = "Registro exitoso. No pudimos enviar el email, usa este enlace para verificar: <a href='".$link."' target='_blank' rel='noopener'>Verificar Email</a>.";
                    }
                }
            } catch (Exception $e) {
                $error = "Error al registrar usuario";
            }
        }
    }
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Diagnóstico de Automatización - Sierra Smart</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="assets/css/style.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<body>
    <?php if (!$airtable_configured): ?>
    <div class="container mt-3">
        <div class="alert alert-danger" role="alert">
            Configuración de Airtable incompleta. Copia <code>.env.example</code> a <code>.env</code> y define <code>AIRTABLE_API_KEY</code> y <code>AIRTABLE_BASE_ID</code>.
        </div>
    </div>
    <?php endif; ?>
    <!-- Header Sierra Smart -->
    <header class="header-main">
        <div class="container">
            <div class="logo-container">
                <div class="logo-placeholder">
                    <!-- ESPACIO PARA TU LOGO -->
                    <i class="fas fa-building"></i>
                </div>
                <div class="brand-text">Sierra Smart</div>
            </div>
        </div>
    </header>

    <!-- Navegación -->
    <nav class="navbar navbar-expand-lg nav-main">
        <div class="container">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav mx-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="index.php">Inicio</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#quienes">Quiénes Somos</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#consultoria">Consultoría</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#contacto">Contacto</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- Contenido Principal -->
    <main class="main-card">
        <div class="card-header-sierra">
            <h1>Transformamos el Real Estate con procesos optimizados</h1>
            <p class="subtitle">Consultoría Smart para Real Estate y Hotelería</p>
            
            <?php if (isset($error)): ?>
                <div class="alert alert-danger mt-3"><?php echo $error; ?></div>
            <?php endif; ?>
            
            <?php if (isset($mensaje)): ?>
                <div class="alert alert-success mt-3"><?php echo $mensaje; ?></div>
            <?php endif; ?>
        </div>

        <?php if (!isset($mensaje)): ?>
        <div class="card-body-sierra">
            <form method="POST" class="form-sierra">
                <div class="row">
                    <div class="col-md-6 mb-4">
                        <label for="nombre" class="form-label">Nombre Completo</label>
                        <input type="text" class="form-control" id="nombre" name="nombre" required>
                    </div>
                    
                    <div class="col-md-6 mb-4">
                        <label for="email" class="form-label">Email Corporativo</label>
                        <input type="email" class="form-control" id="email" name="email" required>
                    </div>
                </div>
                
                <div class="text-center mt-4">
                    <button type="submit" class="btn btn-sierra">Comenzar Diagnóstico</button>
                </div>
            </form>
            
            <div class="mt-5">
                <h3 class="mb-4">Nuestro Diagnóstico de Automatización</h3>
                <p class="text-muted mb-4">
                    Descubra cómo la inteligencia artificial puede revolucionar sus operaciones inmobiliarias. 
                    Nuestro diagnóstico avanzado evalúa 20 áreas críticas de su negocio para proporcionar un roadmap personalizado.
                </p>
                
                <div class="row">
                    <div class="col-md-4 mb-3">
                        <div class="d-flex align-items-start">
                            <i class="fas fa-chart-line text-primary me-3 mt-1"></i>
                            <div>
                                <h5>Análisis Multidimensional</h5>
                                <p class="text-muted small">Evaluación completa de procesos operativos, marketing, sistemas y cumplimiento</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4 mb-3">
                        <div class="d-flex align-items-start">
                            <i class="fas fa-calculator text-primary me-3 mt-1"></i>
                            <div>
                                <h5>ROI Cuantificable</h5>
                                <p class="text-muted small">Cálculo preciso del retorno de inversión y ahorro potencial</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4 mb-3">
                        <div class="d-flex align-items-start">
                            <i class="fas fa-route text-primary me-3 mt-1"></i>
                            <div>
                                <h5>Roadmap Estratégico</h5>
                                <p class="text-muted small">Plan de implementación con quick wins y objetivos a largo plazo</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <?php endif; ?>
    </main>

    <!-- Footer -->
    <footer class="footer-sierra">
        <div class="container">
            <p>&copy; 2024 Sierra Smart. Consultoría Smart para Real Estate y Hotelería</p>
            <p class="small">Transformando negocios con inteligencia artificial y automatización</p>
            <div class="social-icons">
                <a href="#"><i class="fab fa-linkedin"></i></a>
                <a href="#"><i class="fab fa-twitter"></i></a>
                <a href="#"><i class="fab fa-facebook"></i></a>
                <a href="#"><i class="fab fa-instagram"></i></a>
            </div>
        </div>
    </footer>

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>