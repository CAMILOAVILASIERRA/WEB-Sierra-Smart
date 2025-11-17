<?php
require_once 'config.php';
require_once 'functions.php';
// Carga opcional de Airtable
if (file_exists(__DIR__ . '/airtable.php')) {
    require_once __DIR__ . '/airtable.php';
}

// Verificación de configuración Airtable
$airtable_configured = function_exists('airtable_is_configured') ? airtable_is_configured() : false;

// Verificación de usuario
if ($airtable_configured === false) {
    // En modo sin base de datos, permitimos acceso si hay usuario en sesión
    if (!isset($_SESSION['usuario_verificado'])) {
        $_SESSION['usuario_verificado'] = true; // marcar verificado en modo sin BD
    }
} elseif (!isset($_GET['token']) && !isset($_SESSION['usuario_verificado'])) {
    header('Location: index.php');
    exit;
}

if (isset($_GET['token'])) {
    $token = $_GET['token'];
    $rec = airtable_get_usuario_by_token($token);
    if ($rec && isset($rec['id'])) {
        airtable_update(AT_TABLE_USUARIOS, $rec['id'], ['email_verificado' => true]);
        $_SESSION['usuario_verificado'] = $rec['id'];
    } else {
        die("Token inválido o ya utilizado");
    }
}

// Obtener preguntas (Airtable o local)
$preguntas_records = $airtable_configured ? airtable_list_preguntas() : array_map(function($p){ return ['fields' => $p]; }, cargarPreguntasLocal());
$preguntas = [];
foreach ($preguntas_records as $rec) {
    $f = $rec['fields'];
    $preguntas[] = [
        'id_pregunta' => $f['id_pregunta'],
        'area' => $f['area'],
        'texto_pregunta' => $f['texto_pregunta'],
        'tipo_respuesta' => $f['tipo_respuesta'],
        'orden' => $f['orden']
    ];
}

// Obtener respuestas posibles (Airtable o local)
$respuestas_records = $airtable_configured ? airtable_list_respuestas_posibles() : array_map(function($r){ return ['fields' => $r]; }, cargarRespuestasLocal());
$respuestas = [];
foreach ($respuestas_records as $rec) {
    $f = $rec['fields'];
    $respuestas[$f['id_pregunta']][] = [
        'id_respuesta' => $f['id_respuesta'],
        'texto_opcion' => isset($f['texto_opcion']) ? $f['texto_opcion'] : ''
    ];
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Diagnóstico - Sierra Smart</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="assets/css/style.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<body>
    <?php if (!$airtable_configured): ?>
    <div class="container mt-3">
        <div class="alert alert-info" role="alert">
            Modo sin base de datos activado. Tus respuestas se procesarán y guardarán temporalmente en esta sesión.
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

    <!-- Contenido Wizard -->
    <main class="main-card container-narrow">
        <div class="wizard-header">
            <div class="d-flex justify-content-between align-items-center">
                <h3 class="mb-0">Diagnóstico de Automatización con IA</h3>
                <small class="text-muted">Paso <span id="stepCounter">1</span> de <?php echo count($preguntas); ?></small>
            </div>
        </div>
        
        <div class="progress progress-sierra">
            <div id="progressBar" class="progress-bar progress-bar-sierra" role="progressbar" style="width: 5%">5%</div>
        </div>
        
        <div id="wizardContainer">
            <?php foreach ($preguntas as $index => $pregunta): ?>
                <div class="wizard-step fade-in" data-step="<?php echo $index + 1; ?>" 
                     style="<?php echo $index === 0 ? '' : 'display:none;'; ?>">
                    <div class="area-badge"><?php echo $pregunta['area']; ?></div>
                    <h4><?php echo ($index + 1) . '. ' . $pregunta['texto_pregunta']; ?></h4>
                    
                    <?php if ($pregunta['tipo_respuesta'] === 'multiple'): ?>
                        <div class="row">
                            <?php foreach ($respuestas[$pregunta['id_pregunta']] as $opcion): ?>
                                <div class="col-md-6 mb-3">
                                    <div class="form-check-sierra">
                                        <input class="form-check-input" type="radio" 
                                               name="pregunta_<?php echo $pregunta['id_pregunta']; ?>" 
                                               value="<?php echo $opcion['id_respuesta']; ?>" 
                                               id="opcion_<?php echo $opcion['id_respuesta']; ?>">
                                        <label class="form-check-label w-100" 
                                               for="opcion_<?php echo $opcion['id_respuesta']; ?>">
                                            <?php echo $opcion['texto_opcion']; ?>
                                        </label>
                                    </div>
                                </div>
                            <?php endforeach; ?>
                        </div>
                    <?php else: ?>
                        <div class="row mb-4">
                            <?php for ($i = 1; $i <= 5; $i++): ?>
                                <div class="col text-center">
                                    <div class="form-check-sierra text-center">
                                        <input class="form-check-input" type="radio" 
                                               name="pregunta_<?php echo $pregunta['id_pregunta']; ?>" 
                                               value="<?php echo $i; ?>" 
                                               id="escala_<?php echo $pregunta['id_pregunta'] . '_' . $i; ?>">
                                        <label class="form-check-label d-block" 
                                               for="escala_<?php echo $pregunta['id_pregunta'] . '_' . $i; ?>">
                                            <?php echo $i; ?>
                                        </label>
                                    </div>
                                </div>
                            <?php endfor; ?>
                        </div>
                        <div class="row">
                            <div class="col-4 text-start"><small class="text-muted">Muy bajo</small></div>
                            <div class="col-4 text-center"><small class="text-muted">Neutral</small></div>
                            <div class="col-4 text-end"><small class="text-muted">Muy alto</small></div>
                        </div>
                    <?php endif; ?>
                </div>
            <?php endforeach; ?>
        </div>
        
        <!-- Barra de acciones -->
        <div class="actions-bar">
            <button id="btnAnterior" class="btn btn-sierra-secondary" disabled>
                <i class="fas fa-arrow-left me-2"></i>Anterior
            </button>
            <button id="btnSiguiente" class="btn btn-sierra">
                Siguiente<i class="fas fa-arrow-right ms-2"></i>
            </button>
            <button id="btnFinalizar" class="btn btn-sierra" style="display:none;">
                Finalizar Diagnóstico<i class="fas fa-check ms-2"></i>
            </button>
        </div>
    </main>

    <!-- Footer -->
    <footer class="footer-sierra">
        <div class="container">
            <p>&copy; 2024 Sierra Smart. Consultoría Smart para Real Estate y Hotelería</p>
        </div>
    </footer>

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="assets/js/wizard.js"></script>
</body>
</html>