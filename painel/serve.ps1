$port = 8080
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Start()
Write-Host "Servidor ativo em http://localhost:$port/"

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response
        
        $localPath = $request.Url.LocalPath
        if ($localPath -eq "/") { $localPath = "/index.html" }
        
        $filePath = Join-Path $PWD.Path $localPath
        
        if (Test-Path $filePath -PathType Leaf) {
            $buffer = [System.IO.File]::ReadAllBytes($filePath)
            
            # Simple content type matching
            if ($filePath -match "\.html$") { $response.ContentType = "text/html; charset=utf-8" }
            elseif ($filePath -match "\.css$") { $response.ContentType = "text/css; charset=utf-8" }
            elseif ($filePath -match "\.js$") { $response.ContentType = "application/javascript; charset=utf-8" }
            
            $response.ContentLength64 = $buffer.Length
            $response.OutputStream.Write($buffer, 0, $buffer.Length)
        } else {
            $response.StatusCode = 404
        }
        $response.Close()
    }
} finally {
    $listener.Stop()
}
