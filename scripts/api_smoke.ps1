$now = Get-Date -Format yyyyMMddHHmmss
$email = "testuser$now@example.com"
$pwd = "TestPass123!"
$body = @{ name = 'Test User'; email = $email; password = $pwd } | ConvertTo-Json
Write-Output "Registering: $email"
try {
  $reg = Invoke-RestMethod -Method Post -Uri 'http://localhost:3000/api/auth/register' -Body $body -ContentType 'application/json' -ErrorAction Stop
  Write-Output "Register response:"
  $reg | ConvertTo-Json -Depth 5 | Write-Output
} catch {
  Write-Output "Register failed:"
  Write-Output $_
}

Write-Output "\nLogging in"
$loginBody = @{ email = $email; password = $pwd } | ConvertTo-Json
try {
  $login = Invoke-RestMethod -Method Post -Uri 'http://localhost:3000/api/auth/login' -Body $loginBody -ContentType 'application/json' -ErrorAction Stop
  Write-Output "Login response:"
  $login | ConvertTo-Json -Depth 5 | Write-Output
  $token = $null
  if ($login.token) { $token = $login.token } elseif ($login.accessToken) { $token = $login.accessToken } elseif ($login.data -and $login.data.token) { $token = $login.data.token }
  Write-Output "Token: $token"
} catch {
  Write-Output "Login failed:"
  Write-Output $_
  exit 1
}

Write-Output "\nGET /api/bookings (authenticated)"
try {
  $bookings = Invoke-RestMethod -Uri 'http://localhost:3000/api/bookings' -Headers @{ Authorization = "Bearer $token" } -ErrorAction Stop
  $bookings | ConvertTo-Json -Depth 5 | Write-Output
} catch {
  Write-Output "Fetch bookings failed:"
  Write-Output $_
}

Write-Output "\nGET /api/flights"
try {
  $flights = Invoke-RestMethod -Uri 'http://localhost:3000/api/flights' -ErrorAction Stop
  $flights | ConvertTo-Json -Depth 5 | Write-Output
  $flightId = $flights[0].id
  Write-Output "Using flightId: $flightId"
} catch {
  Write-Output "Fetch flights failed:"
  Write-Output $_
  exit 1
}

Write-Output "\nPOST /api/bookings (try with 'passengers')"
$post = @{ flightId = $flightId; passengers = 1 } | ConvertTo-Json
try {
  $new = Invoke-RestMethod -Method Post -Uri 'http://localhost:3000/api/bookings' -Headers @{ Authorization = "Bearer $token" } -Body $post -ContentType 'application/json' -ErrorAction Stop
  $new | ConvertTo-Json -Depth 5 | Write-Output
} catch {
  Write-Output "Create booking failed:"
  Write-Output $_
}
