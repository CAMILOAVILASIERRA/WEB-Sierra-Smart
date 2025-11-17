# Cuestionario – Instrucciones

Proyecto PHP para registro de usuario, cuestionario paso a paso, cálculo de resultados y generación de PDF. Funciona totalmente sin base de datos ni XAMPP.

## Requisitos
- `PHP >= 7.4` (recomendado 8.x)
- Servidor web (Apache/Nginx) o `php -S` para desarrollo
- Opcional: Airtable (persistencia en producción). Si no lo configuras o eliminas `airtable.php`, el cuestionario funcionará usando sesión de PHP.

## Instalación y Configuración
1. Copia el proyecto a tu servidor o máquina local.
2. Airtable (opcional):
   - Si deseas persistir datos, configura `config.php` con `AIRTABLE_API_KEY` y `AIRTABLE_BASE_ID`.
   - Si no deseas usar Airtable, deja vacías las credenciales: el sistema usará sesión y datos locales.
3. Librería PDF (dompdf):
   - Instalación manual recomendada: descarga `dompdf` y colócala en `Cuestionario/assets/lib/dompdf/`.
   - `pdf.php` autodetecta la librería en `assets/lib/dompdf/`. Si más adelante decides usar Composer, también detecta `vendor/autoload.php` si existe.

## Estructura del Proyecto
- `index.php` – Página principal/registro
- `wizard.php` – Cuestionario paso a paso
- `procesar.php` – Procesar respuestas y calcular
- `resultado.php` – Página de resultados
- `pdf.php` – Generador de PDF
- `verificar.php` – Verificación de email
- `config.php` – Configuración de Airtable y del sitio
- `functions.php` – Funciones auxiliares
- `assets/css/style.css` – Estilos personalizados
- `assets/js/wizard.js` – Lógica del wizard
- `assets/lib/dompdf/` – Librería dompdf (si instalación manual)
- `README.md` – Este documento

## Flujo de Uso
1. Accede a `index.php` para registro o ingreso.
2. Completa el cuestionario en `wizard.php`.
3. Se procesan respuestas en `procesar.php` y se redirige a `resultado.php`.
4. Genera el PDF desde `pdf.php`.

## Arranque rápido en desarrollo (sin XAMPP)
- Opción A — PHP embebido: desde la carpeta `Cuestionario` ejecuta `php -S 127.0.0.1:8080` y accede a `http://localhost:8080/Cuestionario/`.
- Opción B — Cualquier servidor web con PHP (Apache/Nginx). No se requiere XAMPP.
- Opción C — Script: ejecuta `start-php-server.ps1` para arrancar el servidor embebido en Windows.
- Si integras el cuestionario en el frontend, usa `VITE_CUESTIONARIO_URL` apuntando a `http://127.0.0.1:8081/Cuestionario/` (puerto por defecto del script en Windows).

### Variables de entorno (solo si usas Airtable)
- Configura `AIRTABLE_API_KEY` y `AIRTABLE_BASE_ID` en `config.php` o vía entorno.

## Notas
- Modo sin base de datos: si no configuras Airtable, el flujo usa sesión de PHP (sin persistencia). Podrás completar el cuestionario y generar el PDF inmediatamente, pero no habrá almacenamiento para consultas posteriores.
- Mantén `style.css` y `wizard.js` sincronizados con los componentes del cuestionario.
- MySQL y archivos `.sql` han sido retirados; no necesitas crear ninguna base de datos.
- Asegúrate de configurar adecuadamente `config.php` y sanitizar entradas en `functions.php`.
### Scripts útiles (Windows)
- `start-php-server.ps1`: arranca el servidor PHP embebido en el puerto 8080.