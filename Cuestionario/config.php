<?php
function loadEnvFile($path){
    if (!is_string($path) || !file_exists($path)) return;
    $lines = @file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    if (!$lines) return;
    foreach ($lines as $line) {
        $line = trim($line);
        if ($line === '' || strpos($line, '#') === 0) continue;
        $parts = explode('=', $line, 2);
        if (count($parts) !== 2) continue;
        $key = trim($parts[0]);
        $val = trim($parts[1]);
        if ($val !== '' && (($val[0] === '"' && substr($val, -1) === '"') || ($val[0] === "'" && substr($val, -1) === "'"))) {
            $val = substr($val, 1, -1);
        }
        putenv($key.'='.$val);
        $_ENV[$key] = $val;
        $_SERVER[$key] = $val;
    }
}
loadEnvFile(__DIR__.'/.env');
loadEnvFile(dirname(__DIR__).'/.env');
// Configuración de Airtable
define('AIRTABLE_API_KEY', getenv('AIRTABLE_API_KEY') ?: '');
define('AIRTABLE_BASE_ID', getenv('AIRTABLE_BASE_ID') ?: '');
// Nombres de tablas (ajustables si difieren en tu base)
define('AT_TABLE_USUARIOS', getenv('AT_TABLE_USUARIOS') ?: 'usuarios_evaluaciones');
define('AT_TABLE_PREGUNTAS', getenv('AT_TABLE_PREGUNTAS') ?: 'preguntas');
define('AT_TABLE_RESPUESTAS', getenv('AT_TABLE_RESPUESTAS') ?: 'respuestas_posibles');

// Configuración del sitio
define('SITE_NAME', 'Sierra Smart - Diagnóstico de Automatización IA');
define('SITE_URL', getenv('SITE_URL') ?: 'https://tudominio.com');
define('ADMIN_EMAIL', getenv('ADMIN_EMAIL') ?: 'admin@sierratowers.com');

// Configuración de correo
define('SMTP_HOST', 'localhost');
define('SMTP_PORT', 587);
define('SMTP_USER', '');
define('SMTP_PASS', '');

// Nota: Se elimina la conexión PDO a MySQL. El sistema usa Airtable.

// Iniciar sesión
session_start();
?>