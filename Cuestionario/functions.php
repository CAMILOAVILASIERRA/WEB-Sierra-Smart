<?php
require_once 'config.php';
// Carga opcional de Airtable: el proyecto funciona sin este archivo
if (file_exists(__DIR__ . '/airtable.php')) {
    require_once __DIR__ . '/airtable.php';
}

// Función para limpiar datos
function limpiarDatos($dato) {
    $dato = trim($dato);
    $dato = stripslashes($dato);
    $dato = htmlspecialchars($dato);
    return $dato;
}

// Función para validar email
function validarEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL);
}

// Función para generar token
function generarToken() {
    return bin2hex(random_bytes(32));
}

// Función para enviar email de verificación
function enviarEmailVerificacion($email, $token) {
    $asunto = "Verifica tu email - Sierra Smart";
    $link = construirEnlaceVerificacion($token);
    $mensaje = "
    <html>
    <body>
        <h2>Verificación de Email</h2>
        <p>Gracias por registrarte en Sierra Smart.</p>
        <p>Por favor, verifica tu email haciendo clic en el siguiente enlace:</p>
        <p><a href='".$link."'>Verificar Email</a></p>
        <p>Si no te registraste, por favor ignora este email.</p>
        <br>
        <p>Atentamente,<br>El equipo de Sierra Smart</p>
    </body>
    </html>
    ";
    
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= 'From: '.SITE_NAME.' <'.ADMIN_EMAIL.'>' . "\r\n";
    
    return mail($email, $asunto, $mensaje, $headers);
}

// Construir enlace absoluto de verificación según host y ruta actual
function construirEnlaceVerificacion($token) {
    $scheme = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
    $host = $_SERVER['HTTP_HOST'] ?? 'localhost';
    $basePath = rtrim(dirname($_SERVER['SCRIPT_NAME']), '/\\');
    return $scheme . '://' . $host . $basePath . '/verificar.php?token=' . urlencode($token);
}

// Función para calcular score
function calcularScore($respuestas) {
    $score_total = 0;
    $score_areas = [
        'Operaciones' => 0,
        'Marketing y Ventas' => 0,
        'Sistemas / Madurez Digital' => 0,
        'Gobierno y Cumplimiento' => 0
    ];

    foreach ($respuestas as $id_pregunta => $respuesta) {
        // Obtener información de la pregunta (Airtable o local)
        $pregunta = get_pregunta_by_id($id_pregunta);
        if ($pregunta) {
            // Normalizar valores base
            $tipo = isset($pregunta['tipo_respuesta']) ? $pregunta['tipo_respuesta'] : 'opcion';
            $peso_area = isset($pregunta['peso_area']) ? (float)$pregunta['peso_area'] : 1.0;
            $area_key = isset($pregunta['area']) ? $pregunta['area'] : 'General';
            if (!array_key_exists($area_key, $score_areas)) {
                $score_areas[$area_key] = 0;
            }

            // Obtener peso de la respuesta
            if ($tipo === 'escala') {
                $val = is_numeric($respuesta) ? (int)$respuesta : 0;
                $val = max(0, min(5, $val));
                $peso_respuesta = $val * 5;
            } else {
                $resp = get_respuesta_by_id($respuesta);
                $peso_respuesta = ($resp && isset($resp['peso_puntuacion'])) ? (float)$resp['peso_puntuacion'] : 0;
            }

            $score_ponderado = $peso_respuesta * $peso_area;
            $score_areas[$area_key] += $score_ponderado;
            $score_total += $score_ponderado;
        }
    }

    $score_maximo = 500;
    $score_normalizado = min(100, ($score_total / $score_maximo) * 100);

    return [
        'score_total' => round($score_normalizado, 2),
        'score_areas' => $score_areas
    ];
}

// Wrappers que obtienen pregunta/respuesta desde Airtable o desde archivos locales
function get_pregunta_by_id($id_pregunta) {
    $use_airtable = function_exists('airtable_is_configured') && airtable_is_configured();
    if ($use_airtable) {
        $rec = airtable_get_pregunta_by_id($id_pregunta);
        return $rec && isset($rec['fields']) ? $rec['fields'] : null;
    }
    $preguntas = cargarPreguntasLocal();
    foreach ($preguntas as $p) {
        if ((int)$p['id_pregunta'] === (int)$id_pregunta) return $p;
    }
    return null;
}

function get_respuesta_by_id($id_respuesta) {
    $use_airtable = function_exists('airtable_is_configured') && airtable_is_configured();
    if ($use_airtable) {
        $rec = airtable_get_respuesta_by_id($id_respuesta);
        return $rec && isset($rec['fields']) ? $rec['fields'] : null;
    }
    $respuestas = cargarRespuestasLocal();
    foreach ($respuestas as $r) {
        if ((int)$r['id_respuesta'] === (int)$id_respuesta) return $r;
    }
    return null;
}

// Carga de preguntas/respuestas locales desde assets/data (modo sin base de datos)
function cargarPreguntasLocal() {
    $path = __DIR__ . '/assets/data/preguntas.json';
    if (file_exists($path)) {
        $data = json_decode(file_get_contents($path), true);
        if (is_array($data)) return $data;
    }
    // Fallback mínimo
    return [
        ['id_pregunta' => 1, 'area' => 'Operaciones', 'texto_pregunta' => '¿Cuánto tiempo dedican a tareas manuales repetitivas?', 'tipo_respuesta' => 'escala', 'orden' => 1, 'peso_area' => 1.2],
        ['id_pregunta' => 2, 'area' => 'Marketing y Ventas', 'texto_pregunta' => '¿Gestionan leads con un sistema automatizado?', 'tipo_respuesta' => 'multiple', 'orden' => 2, 'peso_area' => 1.0],
        ['id_pregunta' => 3, 'area' => 'Sistemas / Madurez Digital', 'texto_pregunta' => 'Nivel de integración entre sistemas clave', 'tipo_respuesta' => 'escala', 'orden' => 3, 'peso_area' => 1.1]
    ];
}

function cargarRespuestasLocal() {
    $path = __DIR__ . '/assets/data/respuestas.json';
    if (file_exists($path)) {
        $data = json_decode(file_get_contents($path), true);
        if (is_array($data)) return $data;
    }
    // Fallback mínimo (solo para preguntas de tipo multiple)
    return [
        ['id_pregunta' => 2, 'id_respuesta' => 201, 'texto_opcion' => 'Sí, completamente', 'peso_puntuacion' => 40],
        ['id_pregunta' => 2, 'id_respuesta' => 202, 'texto_opcion' => 'Parcialmente', 'peso_puntuacion' => 20],
        ['id_pregunta' => 2, 'id_respuesta' => 203, 'texto_opcion' => 'No', 'peso_puntuacion' => 0]
    ];
}

// Función para calcular ROI
function calcularROI($score, $respuestas) {
    // Estimaciones basadas en el score
    $horas_manuales = ($score / 100) * 40; // Máximo 40 horas semanales
    $costo_hora = 25; // Promedio estimado
    $factor_anual = 52; // Semanas en el año
    
    $ahorro_anual = ($horas_manuales * $costo_hora) * $factor_anual;
    
    // Inversión estimada en automatización
    $inversion_estimada = 5000 + ($score * 200);
    
    // ROI simple (evita división por cero y usa variable correcta)
    $roi = $inversion_estimada > 0 ? (($ahorro_anual - $inversion_estimada) / $inversion_estimada) * 100 : 0;
    
    // Impacto en ventas (estimación)
    $impacto_ventas = ($score / 100) * 0.15 * 100000; // 15% de 100k base
    
    return [
        'ahorro_anual' => round($ahorro_anual, 2),
        'roi' => round($roi, 2),
        'impacto_ventas' => round($impacto_ventas, 2),
        'inversion_estimada' => round($inversion_estimada, 2)
    ];
}

// Función para generar informe
function generarInforme($score, $score_areas, $roi, $nombre_empresa) {
    $clasificacion = '';
    if ($score <= 30) {
        $clasificacion = 'Baja necesidad de automatización';
        $tono = 'Aunque actualmente sus procesos son eficientes, siempre hay oportunidades de mejora.';
    } elseif ($score <= 70) {
        $clasificacion = 'Oportunidad significativa de automatización';
        $tono = 'Su empresa se encuentra en un punto ideal para implementar soluciones de automatización.';
    } else {
        $clasificacion = 'Alta urgencia de automatización';
        $tono = 'La automatización de sus procesos es crítica para mantener la competitividad.';
    }
    
    $informe = "
    <h2>Informe de Diagnóstico de Automatización con IA</h2>
    <h3>Empresa: $nombre_empresa</h3>
    <p><strong>Fecha:</strong> " . date('d/m/Y') . "</p>
    
    <h3>Resumen Ejecutivo</h3>
    <p>El análisis completo de los procesos de su empresa revela un score de necesidad de automatización de <strong>$score/100</strong>, 
    clasificado como <em>$clasificacion</em>. $tono</p>
    
    <h3>Análisis por Área</h3>
    <ul>
        <li><strong>Operaciones:</strong> Score de " . round($score_areas['Operaciones'], 2) . " - " . 
        ($score_areas['Operaciones'] > 50 ? 'Alta oportunidad de optimización' : 'Procesos relativamente eficientes') . "</li>
        <li><strong>Marketing y Ventas:</strong> Score de " . round($score_areas['Marketing y Ventas'], 2) . " - " .
        ($score_areas['Marketing y Ventas'] > 40 ? 'Potencial significativo en automatización' : 'Buenas prácticas actuales') . "</li>
        <li><strong>Sistemas / Madurez Digital:</strong> Score de " . round($score_areas['Sistemas / Madurez Digital'], 2) . " - " .
        ($score_areas['Sistemas / Madurez Digital'] > 30 ? 'Necesidad de modernización' : 'Adecuado nivel digital') . "</li>
        <li><strong>Gobierno y Cumplimiento:</strong> Score de " . round($score_areas['Gobierno y Cumplimiento'], 2) . " - " .
        ($score_areas['Gobierno y Cumplimiento'] > 35 ? 'Oportunidad de mejora en controles' : 'Controles adecuados') . "</li>
    </ul>
    
    <h3>Análisis Financiero</h3>
    <p><strong>Ahorro anual estimado:</strong> $" . number_format($roi['ahorro_anual'], 2) . "</p>
    <p><strong>ROI esperado:</strong> " . $roi['roi'] . "%</p>
    <p><strong>Impacto potencial en ventas:</strong> $" . number_format($roi['impacto_ventas'], 2) . "</p>
    <p><strong>Inversión estimada:</strong> $" . number_format($roi['inversion_estimada'], 2) . "</p>
    
    <h3>Recomendaciones Estratégicas</h3>
    
    <h4>Quick Wins (0-3 meses)</h4>
    <ul>
        <li>Automatizar tareas repetitivas identificadas en operaciones</li>
        <li>Implementar sistema básico de gestión de leads</li>
        <li>Digitalizar procesos manuales críticos</li>
    </ul>
    
    <h4>Mediano Plazo (3-9 meses)</h4>
    <ul>
        <li>Integrar sistemas empresariales clave</li>
        <li>Implementar análisis predictivo de ventas</li>
        <li>Desarrollar dashboard de métricas en tiempo real</li>
    </ul>
    
    <h4>Largo Plazo (9-18 meses)</h4>
    <ul>
        <li>Implementar IA para toma de decisiones</li>
        <li>Automatización completa de procesos financieros</li>
        <li>Sistema de gobierno y cumplimiento automatizado</li>
    </ul>
    
    <h3>Roadmap de Implementación</h3>
    <p>Recomendamos comenzar con un proyecto piloto en el área con mayor score (Operaciones) para demostrar valor rápidamente. 
    Posteriormente, expandir gradualmente a otras áreas basándose en los resultados obtenidos.</p>
    
    <h3>Próximos Pasos</h3>
    <p>Para comenzar su journey de transformación digital, recomendamos:</p>
    <ol>
        <li>Agendar una sesión de estrategia detallada</li>
        <li>Definir KPIs específicos para medir el éxito</li>
        <li>Seleccionar el proyecto piloto inicial</li>
        <li>Establecer timeline y recursos necesarios</li>
    </ol>
    
    <p><em>Este informe fue generado automáticamente por el sistema de diagnóstico de Sierra Smart. 
    Para una consulta personalizada, contacte a nuestros expertos.</em></p>
    ";
    
    return $informe;
}
?>