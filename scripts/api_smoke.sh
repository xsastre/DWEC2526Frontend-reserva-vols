#!/usr/bin/env bash
set -euo pipefail

# Simple API smoke script for Linux/macOS
# Requires: curl, jq

BASE_URL=${BASE_URL:-http://localhost:3000}
EMAIL=${EMAIL:-testuser+$(date +%s)@example.com}
PASSWORD=${PASSWORD:-Test1234}

echo "Base URL: $BASE_URL"
echo "Registering user: $EMAIL"

register_resp=$(curl -s -H "Content-Type: application/json" \
  -d "{\"email\": \"$EMAIL\", \"password\": \"$PASSWORD\"}" \
  "$BASE_URL/api/auth/register")

token=$(echo "$register_resp" | jq -r '.token // empty' || true)
if [ -z "$token" ]; then
  echo "Register response did not include a token:" >&2
  echo "$register_resp" >&2
  exit 1
fi

echo "Token received (truncated): ${token:0:20}..."

echo "Fetching flights..."
flights_resp=$(curl -s "$BASE_URL/api/flights")
echo "$flights_resp" | jq '.' || echo "$flights_resp"

flight_id=$(echo "$flights_resp" | jq -r '.[0].id // .[0]._id // empty')
if [ -z "$flight_id" ]; then
  echo "No flights found to create a booking." >&2
  exit 1
fi

echo "Creating booking for flight id: $flight_id"
booking_resp=$(curl -s -H "Authorization: Bearer $token" -H "Content-Type: application/json" \
  -d "{\"flightId\": \"$flight_id\", \"passengers\": 1}" \
  "$BASE_URL/api/bookings")

echo "Booking response:"
echo "$booking_resp" | jq '.' || echo "$booking_resp"

echo "Done. If you want to reuse the token, set environment variable TOKEN=$token"
