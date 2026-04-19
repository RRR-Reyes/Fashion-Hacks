# This script loads the .env file into your terminal session
foreach ($line in Get-Content .env) {
    $name, $value = $line -split '=', 2
    [System.Environment]::SetEnvironmentVariable($name, $value, "Process")
}
Write-Host "✅ Environment variables loaded!" -ForegroundColor Green