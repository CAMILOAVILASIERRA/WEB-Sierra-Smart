<?php
require_once 'config.php';
require_once 'functions.php';
// Carga opcional de Airtable
if (file_exists(__DIR__ . '/airtable.php')) {
    require_once __DIR__ . '/airtable.php';
}

header('Content-Type: application/json');

$action = isset($_POST['action']) ? $_POST['action'] : null;
if ($action !== 'procesar_diagnostico') {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Acción inválida']);
    exit;
}

if ($_POST['action'] === 'procesar_diagnostico') {
    $respuestas = isset($_POST['respuestas']) ? $_POST['respuestas'] : null;
    if (!is_array($respuestas) || empty($respuestas)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Respuestas inválidas']);
        exit;
    }
    $id_usuario = isset($_SESSION['usuario_verificado']) ? $_SESSION['usuario_verificado'] : null;
    $airtable_configured = function_exists('airtable_is_configured') ? airtable_is_configured() : false;

    try {
        // Calcular score y ROI
        $resultados = calcularScore($respuestas);
        $roi = calcularROI($resultados['score_total'], $respuestas);

        // Obtener nombre del usuario
        if ($airtable_configured && $id_usuario) {
            $recUsuario = airtable_get_usuario_by_id($id_usuario);
            $usuarioNombre = isset($recUsuario['fields']['nombre']) ? $recUsuario['fields']['nombre'] : '';
        } else {
            $usuarioNombre = isset($_SESSION['usuario']['nombre']) ? $_SESSION['usuario']['nombre'] : '';
        }

        // Generar informe
        $informe = generarInforme($resultados['score_total'], $resultados['score_areas'], $roi, $usuarioNombre);

        if ($airtable_configured && $id_usuario) {
            // Actualizar Airtable
            airtable_update(AT_TABLE_USUARIOS, $id_usuario, [
                'score_final' => $resultados['score_total'],
                'json_respuestas' => json_encode($respuestas, JSON_UNESCAPED_UNICODE),
                'informe_generado' => $informe,
                'roi_estimado' => $roi['roi'],
                'ahorro_anual' => $roi['ahorro_anual'],
                'impacto_ventas' => $roi['impacto_ventas']
            ]);
        } else {
            // Guardar en sesión (modo sin base de datos)
            $_SESSION['resultado'] = [
                'nombre' => $usuarioNombre,
                'email' => isset($_SESSION['usuario']['email']) ? $_SESSION['usuario']['email'] : '',
                'score_final' => $resultados['score_total'],
                'json_respuestas' => json_encode($respuestas, JSON_UNESCAPED_UNICODE),
                'informe_generado' => $informe,
                'roi_estimado' => $roi['roi'],
                'ahorro_anual' => $roi['ahorro_anual'],
                'impacto_ventas' => $roi['impacto_ventas'],
                'email_verificado' => true
            ];
        }

        echo json_encode([
            'success' => true,
            'id_usuario' => ($airtable_configured && $id_usuario) ? $id_usuario : null
        ]);
        exit;

    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => $e->getMessage()
        ]);
        exit;
    }
}
?>