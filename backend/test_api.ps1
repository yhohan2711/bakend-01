$base = "http://localhost:8080/opticadigital/api/usuarios"

Write-Output "1. Listando usuarios..."
try {
    $response = Invoke-WebRequest -Uri $base -Method GET -UseBasicParsing
    Write-Output "Status: $($response.StatusCode)"
    Write-Output "Content: $($response.Content)"
}
catch {
    Write-Output "Fallo GET: $_"
}

Write-Output "2. Creando usuario prueba..."
$body = @{
    nombre   = "TestUser"
    email    = "test@user.com"
    password = "123"
    rol      = "cliente"
} | ConvertTo-Json

try {
    $response = Invoke-WebRequest -Uri $base -Method POST -Body $body -ContentType "application/json" -UseBasicParsing
    Write-Output "Status: $($response.StatusCode)"
    Write-Output "Content: $($response.Content)"
    
    $json = $response.Content | ConvertFrom-Json
    $id = $json.id
    Write-Output "ID Creado: $id"
    
    if ($id) {
        Write-Output "3. Eliminando usuario $id..."
        $delUrl = "$base/$id"
        $delResponse = Invoke-WebRequest -Uri $delUrl -Method DELETE -UseBasicParsing
        Write-Output "Status Delete: $($delResponse.StatusCode)"
    }
}
catch {
    $code = $_.Exception.Response.StatusCode.value__
    if ($code -eq 409) {
        Write-Output "OK: Usuario ya existe (409 Conflict). Prueba exitosa."
    }
    else {
        Write-Output "Fallo POST/DELETE: $_"
    }
}
