# API Smoke Tests

Date: 2026-02-21

Summary: quick HTTP smoke tests run against the backend at `http://localhost:3000` to verify authentication, flights listing and bookings flows.

Environment:

- Frontend dev server: served on `http://localhost:4300/` (ng serve)
- Backend API: `http://localhost:3000/` (assumed already running)

Tests performed (curl-equivalent commands) and results

1) GET /

Command:

```bash
curl -i http://localhost:3000/
```

Result: 200 OK

Sample response:

```json
{ "message": "Benvingut a l'API de Reserves de Vols", "documentacio":"/api-docs", "endpoints": {"auth":"/api/auth","flights":"/api/flights","bookings":"/api/bookings"} }
```

2) GET /api/flights

Command:

```bash
curl -i http://localhost:3000/api/flights
```

Result: 200 OK — returned a JSON array of flight objects. Example (truncated):

```json
[
  { "id":1, "flightNumber":"VL001", "origin":"Barcelona", "destination":"Madrid", "departureDate":"2024-06-15", "price":89.99, "availableSeats":120, "airline":"Vueling" },
  { "id":2, "flightNumber":"IB234", "origin":"Barcelona", "destination":"París", "price":149.99 }
]
```

3) GET /api/bookings (unauthenticated)

Command:

```bash
curl -i http://localhost:3000/api/bookings
```

Result: 401 Unauthorized (expected — bookings require authentication).

4) POST /api/auth/register (create test user)

Command (curl):

```bash
curl -i -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"testuser@example.com","password":"TestPass123!"}'
```

Result: 201/200 (depending on backend) — registration succeeded and returned a token and user object.

Sample response (truncated):

```json
{ "message":"Usuari registrat correctament", "token":"<JWT>", "user": { "id":2, "name":"Test User", "email":"testuser@example.com" } }
```

5) POST /api/auth/login

Command:

```bash
curl -i -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"testuser@example.com","password":"TestPass123!"}'
```

Result: 200 OK — returned JWT token and user info.

Sample response:

```json
{ "message":"Login correcte", "token":"<JWT>", "user": { "id":2, "name":"Test User", "email":"testuser@example.com" } }
```

6) GET /api/bookings (authenticated)

Command (using token obtained above):

```bash
curl -i -H "Authorization: Bearer <JWT>" http://localhost:3000/api/bookings
```

Result: 200 OK — returned the authenticated user's bookings (empty initially in tests).

7) POST /api/bookings (attempt with wrong payload)

Command (wrong field `seats`):

```bash
curl -i -X POST http://localhost:3000/api/bookings \
  -H "Authorization: Bearer <JWT>" \
  -H "Content-Type: application/json" \
  -d '{"flightId":1, "seats":1}'
```

Result: 400 Bad Request — response body: `{"error":"flightId i passengers són obligatoris"}` (backend expects `passengers`, not `seats`).

8) POST /api/bookings (correct payload)

Command (correct field `passengers`):

```bash
curl -i -X POST http://localhost:3000/api/bookings \
  -H "Authorization: Bearer <JWT>" \
  -H "Content-Type: application/json" \
  -d '{"flightId":1, "passengers":1}'
```

Result: 201/200 — booking created successfully.

Sample response (truncated):

```json
{ "message":"Reserva creada correctament", "booking": { "id":1, "userId":3, "flightId":1, "passengers":1, "totalPrice":89.99, "status":"confirmed", "flight": { "id":1, "flightNumber":"VL001", "price":89.99, "availableSeats":119 } } }
```

Notes and next steps:

- The tests above were executed via PowerShell using `Invoke-RestMethod` (script: `scripts/api_smoke.ps1`) during the session — the script is included in the repo.
- For repeatable tests replace `<JWT>` with the `token` value returned by `/api/auth/login`.
- If you want, I can add a small bash script with `curl` equivalents or a Postman collection for easier re-use.
