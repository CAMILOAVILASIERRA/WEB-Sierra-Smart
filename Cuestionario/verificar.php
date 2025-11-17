<?php
require_once 'config.php';
require_once 'functions.php';
// Carga opcional de Airtable
if (file_exists(__DIR__ . '/airtable.php')) {
    require_once __DIR__ . '/airtable.php';
}

// Verificación de configuración Airtable
$airtable_configured = function_exists('airtable_is_configured') ? airtable_is_configured() : false;

// Si Airtable está configurado, requerimos token; si no, mostramos error informativo
if ($airtable_configured && !isset($_GET['token'])) {
    header('Location: index.php');
    exit;
}

$token = isset($_GET['token']) ? $_GET['token'] : null;

if (!$airtable_configured) {
    $error = "Configuración de Airtable incompleta. Copia .env.example a .env y define AIRTABLE_API_KEY y AIRTABLE_BASE_ID.";
    $mostrar_boton = false;
} elseif ($token) {
    try {
        // Buscar usuario por token en Airtable
        $rec = airtable_get_usuario_by_token($token);
        if ($rec && isset($rec['id'])) {
            $recordId = $rec['id'];
            airtable_update(AT_TABLE_USUARIOS, $recordId, [
                'email_verificado' => true,
                'token_verificacion' => null
            ]);
            $mensaje = "¡Email verificado exitosamente! Ahora puedes comenzar el diagnóstico.";
            $mostrar_boton = true;
            $_SESSION['usuario_verificado'] = $recordId;
        } else {
            $error = "Token inválido o ya utilizado";
            $mostrar_boton = false;
        }
    } catch (Exception $e) {
        $error = "Error al verificar el email";
        $mostrar_boton = false;
    }
} else {
    $error = "Token no proporcionado";
    $mostrar_boton = false;
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verificación - Sierra Smart</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="assets/css/style.css" rel="stylesheet">
</head>
<body>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card shadow">
                    <div class="card-body text-center p-5">
                        <?php if (isset($mensaje)): ?>
                            <div class="mb-4">
                                <div style="font-size: 4rem;">✅</div>
                                <h2 class="text-success"><?php echo $mensaje; ?></h2>
                            </div>
                            
                            <?php if ($mostrar_boton): ?>
                                <a href="wizard.php" class="btn btn-primary btn-lg">Comenzar Diagnóstico</a>
                            <?php endif; ?>
                        <?php else: ?>
                            <div class="mb-4">
                                <div style="font-size: 4rem;">❌</div>
                                <h2 class="text-danger"><?php echo $error; ?></h2>
                            </div>
                            <a href="index.php" class="btn btn-secondary">Volver al Inicio</a>
                        <?php endif; ?>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>