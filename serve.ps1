# Zero-dependency local development server for Ayoola Damisile Portfolio
param(
    [int]$Port = 3000
)

$rootDir = $PSScriptRoot
if (-not $rootDir) {
    $rootDir = Get-Location
}

# Find an available port starting at $Port
while ($true) {
    try {
        $listener = New-Object System.Net.HttpListener
        $prefix = "http://localhost:$Port/"
        $listener.Prefixes.Add($prefix)
        $listener.Start()
        break
    } catch {
        $Port++
        if ($Port -gt 3100) {
            Write-Error "Could not find an available port between 3000 and 3100."
            exit 1
        }
    }
}

$mimeTypes = @{
    ".html" = "text/html; charset=utf-8"
    ".htm"  = "text/html; charset=utf-8"
    ".css"  = "text/css; charset=utf-8"
    ".js"   = "application/javascript; charset=utf-8"
    ".json" = "application/json; charset=utf-8"
    ".png"  = "image/png"
    ".jpg"  = "image/jpeg"
    ".jpeg" = "image/jpeg"
    ".webp" = "image/webp"
    ".gif"  = "image/gif"
    ".svg"  = "image/svg+xml"
    ".ico"  = "image/x-icon"
    ".pdf"  = "application/pdf"
    ".xml"  = "application/xml"
    ".txt"  = "text/plain; charset=utf-8"
}

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host " Ayoola Damisile Portfolio — Local Preview Server" -ForegroundColor Green
Write-Host " Root: $rootDir" -ForegroundColor Gray
Write-Host " URL:  http://localhost:$Port/" -ForegroundColor Yellow
Write-Host " Press [Ctrl+C] to stop the server." -ForegroundColor Gray
Write-Host "==========================================================" -ForegroundColor Cyan

# Launch browser
Start-Process "http://localhost:$Port/"

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $rawUrl = [System.Web.HttpUtility]::UrlDecode($request.Url.LocalPath)
        if ($rawUrl -eq "/" -or $rawUrl -eq "") {
            $rawUrl = "/index.html"
        }

        # Resolve relative local path
        $relPath = $rawUrl.TrimStart("/").Replace("/", "\")
        $filePath = Join-Path $rootDir $relPath

        # Check clean URLs (e.g. /projects -> /projects.html)
        if (-not (Test-Path $filePath -PathType Leaf)) {
            if (Test-Path "$filePath.html" -PathType Leaf) {
                $filePath = "$filePath.html"
            } elseif (Test-Path (Join-Path $filePath "index.html") -PathType Leaf) {
                $filePath = Join-Path $filePath "index.html"
            }
        }

        if (Test-Path $filePath -PathType Leaf) {
            $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
            $mime = if ($mimeTypes.ContainsKey($ext)) { $mimeTypes[$ext] } else { "application/octet-stream" }

            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            $response.ContentType = $mime
            $response.ContentLength64 = $bytes.Length
            $response.StatusCode = 200
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
            Write-Host "200 $mime -> $rawUrl" -ForegroundColor DarkGreen
        } else {
            $response.StatusCode = 404
            $msg = [System.Text.Encoding]::UTF8.GetBytes("<h1>404 Not Found</h1><p>Path $rawUrl not found.</p>")
            $response.ContentType = "text/html; charset=utf-8"
            $response.ContentLength64 = $msg.Length
            $response.OutputStream.Write($msg, 0, $msg.Length)
            Write-Host "404 Not Found -> $rawUrl" -ForegroundColor Red
        }

        $response.OutputStream.Close()
    }
} finally {
    $listener.Stop()
    $listener.Close()
    Write-Host "`nServer stopped." -ForegroundColor Yellow
}
