# Weather App (API)

## Problem

Build a weather app that geocodes a city name then fetches live weather data from Open-Meteo (free, no API key required).

## Requirements

- **Search input** for a city name plus a **Search button** (no auto-debounce needed)
- API calls (both free, no key):
  - Geocoding: `https://geocoding-api.open-meteo.com/v1/search?name={city}&count=1`
  - Weather:   `https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current_weather=true`
- Display:
  - City name and country
  - Temperature with a **°C / °F toggle** (conversion done locally — no re-fetch)
  - Wind speed (km/h)
  - Weather description + **emoji icon** mapped from WMO weather code
- **Loading state** while fetching
- **Error state** for unknown city (geocoding returns 0 results) or network failure

## Edge Cases

- °C ↔ °F toggle converts the stored °C value locally; does not re-fetch
- Pressing **Enter** in the search box triggers the same fetch as the button
- Empty input shows a validation message without fetching
- Weather code → emoji mapping (approximate is fine):
  - 0 → ☀️ Clear
  - 1–3 → ⛅ Partly cloudy
  - 45–48 → 🌫️ Fog
  - 51–67 → 🌧️ Rain
  - 71–77 → ❄️ Snow
  - 80–82 → 🌦️ Showers
  - 95–99 → ⛈️ Thunderstorm
