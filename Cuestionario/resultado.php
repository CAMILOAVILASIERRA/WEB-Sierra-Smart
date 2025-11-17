<?php
require_once 'config.php';
require_once 'functions.php';
// Carga opcional de Airtable
if (file_exists(__DIR__ . '/airtable.php')) {
    require_once __DIR__ . '/airtable.php';
}

// Detectar disponibilidad de Dompdf para mostrar acciones de PDF
$dompdf_available = false;
$dompdf_autoload_candidates = [
    __DIR__ . '/assets/lib/dompdf/autoload.inc.php',
    __DIR__ . '/assets/lib/dompdf/autoload.php',
    __DIR__ . '/assets/lib/dompdf/src/autoload.php',
    __DIR__ . '/vendor/autoload.php'
];
foreach ($dompdf_autoload_candidates as $candidate) {
    if (file_exists($candidate)) {
        $dompdf_available = true;
        break;
    }
}

// Verificación de configuración Airtable
$airtable_configured = function_exists('airtable_is_configured') ? airtable_is_configured() : false;

 $has_id = isset($_GET['id']);

 $id_usuario = $has_id ? $_GET['id'] : null;

 if ($has_id && $airtable_configured) {
    try {
        $rec = airtable_get_usuario_by_id($id_usuario);
        $fields = isset($rec['fields']) ? $rec['fields'] : null;
        if ($fields && !empty($fields['email_verificado']) && isset($fields['score_final'])) {
            $resultado = $fields;
        }
    } catch (Exception $e) {
        $resultado = null;
    }
 }
 // Fallback a sesión en modo sin base de datos
 if (!$airtable_configured && !$has_id && isset($_SESSION['resultado'])) {
    $resultado = $_SESSION['resultado'];
 }
 $has_result = isset($resultado) && is_array($resultado);
 if ($has_result) {
    if ($resultado['score_final'] <= 30) {
        $clasificacion = 'Baja Necesidad';
        $color = '#28a745';
        $badge_class = 'bg-success';
    } elseif ($resultado['score_final'] <= 70) {
        $clasificacion = 'Oportunidad Significativa';
        $color = '#ffc107';
        $badge_class = 'bg-warning text-dark';
    } else {
        $clasificacion = 'Alta Urgencia';
        $color = '#dc3545';
        $badge_class = 'bg-danger';
    }
 }
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Resultados - Sierra Smart</title>
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
    <!-- Header -->
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

    <!-- Contenido Resultados -->
    <?php if ($has_result): ?>
    <main class="main-card">
        <div class="results-header">
            <h2>Resultados del Diagnóstico <span class="badge <?php echo $badge_class; ?> ms-2"><?php echo $clasificacion; ?></span></h2>
            <p class="mb-0"><?php echo $resultado['nombre']; ?> • <?php echo date('d/m/Y'); ?></p>
            
            <div class="score-display">
                <div class="score-number"><?php echo $resultado['score_final']; ?>/100</div>
                <div class="score-label"><?php echo $clasificacion; ?></div>
            </div>
        </div>
        
        <div class="card-body-sierra">
            <!-- Métricas Clave -->
            <div class="metrics-grid">
                <div class="metric-card">
                    <div class="metric-value">$<?php echo number_format($resultado['ahorro_anual'], 0); ?></div>
                    <div class="metric-label">Ahorro Anual Estimado</div>
                </div>
                <div class="metric-card">
                    <div class="metric-value"><?php echo $resultado['roi_estimado']; ?>%</div>
                    <div class="metric-label">ROI Esperado</div>
                </div>
                <div class="metric-card">
                    <div class="metric-value">$<?php echo number_format($resultado['impacto_ventas'], 0); ?></div>
                    <div class="metric-label">Impacto en Ventas</div>
                </div>
            </div>
            
            <!-- Informe Detallado -->
            <div class="informe-section">
                <?php echo $resultado['informe_generado']; ?>
            </div>
            
            <!-- Acciones -->
            <div class="text-center mt-5">
                <?php if ($dompdf_available): ?>
                    <a href="pdf.php?id=<?php echo htmlspecialchars($id_usuario); ?>" class="btn btn-sierra me-3" target="_blank" rel="noopener">
                        <i class="fas fa-download me-2"></i>Descargar Informe PDF
                    </a>
                    <a href="<?php echo $airtable_configured ? ('pdf.php?id=' . htmlspecialchars($id_usuario) . '&view=1') : 'pdf.php?view=1'; ?>" class="btn btn-sierra-secondary me-3" target="_blank" rel="noopener">
                        <i class="fas fa-file-pdf me-2"></i>Ver en navegador
                    </a>
                <?php else: ?>
                    <div class="alert alert-info d-inline-block me-3" role="alert">
                        Para exportar PDF, instala la librería Dompdf en <code>assets/lib/dompdf/</code>.
                    </div>
                <?php endif; ?>
                <button class="btn btn-sierra-secondary" onclick="agendarConsulta()">
                    <i class="fas fa-calendar me-2"></i>Agendar Consulta Gratuita
                </button>
            </div>
            
            <!-- CTA Final -->
            <div class="alert alert-info mt-5">
                <div class="row align-items-center">
                    <div class="col-md-8">
                        <h5 class="mb-2">¿Listo para Transformar su Empresa?</h5>
                        <p class="mb-0">Nuestros expertos están listos para implementar las recomendaciones de este diagnóstico.</p>
                    </div>
                    <div class="col-md-4 text-end">
                        <button class="btn btn-sierra" onclick="contactarExperto()">
                            Contactar Experto
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </main>
    <?php else: ?>
    <main class="main-card">
        <div class="results-header">
            <h2>Resultados del Diagnóstico</h2>
            <p class="mb-0">Consulta: <?php echo date('d/m/Y'); ?></p>
        </div>
        <div class="card-body-sierra">
            <div class="alert alert-warning">
                <strong>No encontramos tu resultado verificado.</strong>
                Por favor, verifica tu correo electrónico o completa nuevamente el cuestionario.
            </div>
            <div class="text-center mt-4">
                <a href="verificar.php?id=<?php echo htmlspecialchars($id_usuario); ?>" class="btn btn-sierra me-3">
                    <i class="fas fa-envelope me-2"></i>Verificar Email
                </a>
                <a href="wizard.php" class="btn btn-sierra-secondary me-3">
                    <i class="fas fa-list-check me-2"></i>Ir al cuestionario
                </a>
                <a href="index.php" class="btn btn-link">Volver al inicio</a>
            </div>
        </div>
    </main>
    <?php endif; ?>

    <!-- Footer -->
    <footer class="footer-sierra">
        <div class="container">
            <p>&copy; 2024 Sierra Smart. Consultoría Smart para Real Estate y Hotelería</p>
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
    <script>
        function agendarConsulta() {
            window.location.href = 'mailto:consultas@sierratowers.com?subject=Consulta Post-Diagnóstico';
        }
        
        function contactarExperto() {
            window.location.href = 'mailto:expertos@sierratowers.com?subject=Solicitud de Consulta - Diagnóstico Completado';
        }
    </script>
</body>
</html>