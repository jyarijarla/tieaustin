# Run this immediately after generating your auth code in Zoho (10-min expiry)
# Usage: .\get-token.ps1

$clientId     = "YOUR_CLIENT_ID"
$clientSecret = "YOUR_CLIENT_SECRET"
$authCode     = "YOUR_AUTH_CODE"

$body = @{
    grant_type    = "authorization_code"
    client_id     = $clientId
    client_secret = $clientSecret
    code          = $authCode
    redirect_uri  = "https://www.zoho.com"
}

$response = Invoke-RestMethod -Uri "https://accounts.zoho.com/oauth/v2/token" `
    -Method POST `
    -ContentType "application/x-www-form-urlencoded" `
    -Body $body

Write-Host ""
Write-Host "=== COPY YOUR REFRESH TOKEN BELOW ===" -ForegroundColor Green
Write-Host $response.refresh_token -ForegroundColor Yellow
Write-Host "======================================" -ForegroundColor Green
Write-Host ""
Write-Host "Access token (expires in 1hr, ignore this):" -ForegroundColor Gray
Write-Host $response.access_token -ForegroundColor Gray
