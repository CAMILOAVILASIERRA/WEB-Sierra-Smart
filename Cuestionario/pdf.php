<?php
require_once 'config.php';
require_once 'functions.php';
// Carga opcional de Airtable
if (file_exists(__DIR__ . '/airtable.php')) {
    require_once __DIR__ . '/airtable.php';
}

// Verificación de configuración Airtable
$airtable_configured = function_exists('airtable_is_configured') ? airtable_is_configured() : false;

// Autodetección de autoload de Dompdf (Composer o instalación manual)
$autoloaded = false;
$paths = [
    // Composer local dentro de Cuestionario
    __DIR__ . '/vendor/autoload.php',
    // Composer en proyecto raíz (por si se instala arriba)
    dirname(__DIR__) . '/vendor/autoload.php',
    // Instalación manual de Dompdf (versiones antiguas)
    __DIR__ . '/assets/lib/dompdf/autoload.inc.php',
    // Instalación manual alternativa
    __DIR__ . '/assets/lib/dompdf/autoload.php',
    __DIR__ . '/assets/lib/dompdf/src/autoload.php',
];
foreach ($paths as $path) {
    if (is_string($path) && file_exists($path)) {
        require_once $path;
        $autoloaded = true;
        break;
    }
}
if (!$autoloaded || !class_exists('Dompdf\\Dompdf')) {
    http_response_code(500);
    die('No se encontró la librería Dompdf. Instálala con Composer (composer require dompdf/dompdf) o coloca la librería en Cuestionario/assets/lib/dompdf/.');
}
use Dompdf\Dompdf;
use Dompdf\Options;

// En modo sin base de datos podemos generar PDF desde sesión directamente
$id_usuario = isset($_GET['id']) ? $_GET['id'] : null;
if (!$id_usuario && (!isset($_SESSION['resultado']) || !is_array($_SESSION['resultado']))) {
    http_response_code(400);
    die('ID no especificado');
}
 
// Obtener datos desde Airtable
if ($airtable_configured && $id_usuario) {
    try {
        $rec = airtable_get_usuario_by_id($id_usuario);
        $resultado = isset($rec['fields']) ? $rec['fields'] : null;
    } catch (Exception $e) {
        $resultado = null;
    }
} else {
    // Modo sin base de datos: usar resultado en sesión
    $resultado = isset($_SESSION['resultado']) ? $_SESSION['resultado'] : null;
}

if (!$resultado || empty($resultado['email_verificado']) || !isset($resultado['score_final'])) {
    die('Resultado no encontrado');
}

// Configurar dompdf
 $options = new Options();
 $options->set('defaultFont', 'Arial');
 $options->set('isRemoteEnabled', true);
 // Evitar accesos fuera de la carpeta y ayudar con rutas relativas
 $options->setChroot(__DIR__);
 $dompdf = new Dompdf($options);
 // Base path para recursos relativos (CSS/IMG) si aparecen en el informe
 if (method_exists($dompdf, 'setBasePath')) {
     $dompdf->setBasePath(__DIR__);
 }

// Sanitizar campos básicos
 $empresa = htmlspecialchars($resultado['nombre'] ?? '', ENT_QUOTES, 'UTF-8');
 $email = htmlspecialchars($resultado['email'] ?? '', ENT_QUOTES, 'UTF-8');
 $score_final = isset($resultado['score_final']) ? (float)$resultado['score_final'] : 0;
 $ahorro_anual = isset($resultado['ahorro_anual']) ? (float)$resultado['ahorro_anual'] : 0;
 $roi_estimado = isset($resultado['roi_estimado']) ? (float)$resultado['roi_estimado'] : 0;
 $impacto_ventas = isset($resultado['impacto_ventas']) ? (float)$resultado['impacto_ventas'] : 0;

// HTML del PDF
 $html = '
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Informe de Automatización - Sierra Smart</title>
    <style>
        body { font-family: Arial, sans-serif; font-size: 12px; }
        .header { text-align: center; border-bottom: 2px solid #007bff; padding-bottom: 20px; margin-bottom: 30px; }
        .score-box { background: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0; }
        .metricas { display: flex; justify-content: space-between; margin: 20px 0; }
        .metrica { text-align: center; padding: 10px; }
        .footer { margin-top: 50px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center; font-size: 10px; color: #666; }
        h1 { color: #007bff; }
        h2 { color: #333; border-bottom: 1px solid #ddd; padding-bottom: 5px; }
        h3 { color: #666; }
        ul { margin-left: 20px; }
        .highlight { background: #fff3cd; padding: 10px; border-left: 4px solid #ffc107; margin: 10px 0; }
    </style>
</head>
<body>
    <div class="header">
        <h1>Sierra Smart</h1>
        <h2>Informe de Diagnóstico de Automatización con IA</h2>
        <p><strong>Empresa:</strong> ' . $empresa . '</p>
        <p><strong>Fecha:</strong> ' . date('d/m/Y') . '</p>
        <p><strong>Email:</strong> ' . $email . '</p>
    </div>
    
    <div class="score-box">
        <h2>Score de Necesidad de Automatización</h2>
        <p style="font-size: 24px; font-weight: bold; text-align: center;">' . $score_final . '/100</p>
        <div class="highlight">
            <strong>Clasificación:</strong> ' . ($score_final <= 30 ? 'Baja Necesidad' : ($score_final <= 70 ? 'Oportunidad Significativa' : 'Alta Urgencia')) . '
        </div>
    </div>
    
    <div class="metricas">
        <div class="metrica">
            <h4>Ahorro Anual</h4>
            <p>$' . number_format($ahorro_anual, 2) . '</p>
        </div>
        <div class="metrica">
            <h4>ROI Esperado</h4>
            <p>' . $roi_estimado . '%</p>
        </div>
        <div class="metrica">
            <h4>Impacto Ventas</h4>
            <p>$' . number_format($impacto_ventas, 2) . '</p>
        </div>
    </div>
    
    <div>
        ' . (isset($resultado['informe_generado']) ? $resultado['informe_generado'] : '') . '
    </div>
    
    <div class="footer">
        <p>Este informe fue generado automáticamente por Sierra Smart - Transformación Digital con IA</p>
        <p>Para consultas adicionales, contacte a expertos@sierratowers.com</p>
        <p>© 2024 Sierra Smart. Todos los derechos reservados.</p>
    </div>
</body>
</html>';

// Generar PDF
try {
 $dompdf->loadHtml($html);
 $dompdf->setPaper('A4', 'portrait');
 $dompdf->render();
} catch (\Throwable $e) {
    http_response_code(500);
    // Mostrar un mensaje más descriptivo y evitar depuración de HTML crudo
    die('Error generando el PDF. Detalle: ' . htmlspecialchars($e->getMessage(), ENT_QUOTES, 'UTF-8'));
}

// Descargar (modo vista si ?view=1)
 $attachment = isset($_GET['view']) ? 0 : 1;
 $dompdf->stream('Informe_Automatizacion_SierraSmart_' . date('Y-m-d') . '.pdf', ['Attachment' => $attachment]);
?>