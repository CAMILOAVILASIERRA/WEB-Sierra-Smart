Param(
  [int]$Port = 8080
)

$php = Get-Command php -ErrorAction SilentlyContinue
if (-not $php) {
  # Intentar rutas comunes de php.exe en Windows (XAMPP o instalación manual)
  $phpPath = $null
  $candidates = @(
    "C:\xampp\php\php.exe",
    "C:\Program Files\php\php.exe",
    "C:\Program Files (x86)\php\php.exe",
    "$env:LOCALAPPDATA\Programs\php\php.exe"
  )
  foreach ($candidate in $candidates) {
    if (Test-Path $candidate) {
      $phpPath = $candidate
      break
    }
  }
  if (-not $phpPath) {
    Write-Host "PHP no encontrado. Instala PHP (https://windows.php.net/download/) y agrega php.exe al PATH, o usa la ruta de XAMPP." -ForegroundColor Yellow
    exit 1
  }
}

# Servir desde el directorio padre para que la ruta /Cuestionario/ funcione
$root = (Resolve-Path "$PSScriptRoot\..").Path
Set-Location $root
Write-Host "Iniciando servidor PHP embebido en 127.0.0.1:$Port (DocumentRoot: $root)" -ForegroundColor Green
if ($php) {
  php -S 127.0.0.1:$Port
} else {
  & $phpPath -S 127.0.0.1:$Port
}