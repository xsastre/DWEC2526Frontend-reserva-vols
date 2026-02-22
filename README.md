<img src="https://docencia.xaviersastre.cat/imatges/logosxs/header_tasca_tassa_1024x293.png" alt="drawing"/>

# Reserves de Vols — Frontend

![CIFP Borja Moll Xavier Sastre 2525](https://img.shields.io/badge/CIFP_Borja_Moll-Xavier_Sastre_2526-blau?logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABJCAIAAABEshTrAAAAAXNSR0IB2cksfwAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAlwSFlzAAAuIwAALiMBeKU/dgAAAAd0SU1FB+oCFQsTI6nRuYgAAAQvSURBVHja7dxLSDJRFADgxrLRRdBroT0XBUHUKswigoggaNGqdQ+ICmoRYYtQCiKiTRm1iHYFWVBBBVaLgqCgkp46QUQvH/goy8DMcmbUf/Fvgr8/neuMmZ6zHs6599OZe+8ZEfP7/XEQwQUPCAALsAALsAALsIAAsAALsAArOiPhl46boiiz2Wy1Ws1ms8PheHp6oigKx3GRSJSUlJSdnS0WizMyMuLj49ms6v9V8f7+rtFoRkdHRSJRwKnl5uYqlcqDgwO3281K9V+D9fr6ury8XFpaivCFKCoqUqlUj4+P0Y9F0/T29nZZWVmI95BAIJibm3O5XFGL9fz8LJPJWHzsVFVVnZ+fRyHW9fV1RUUFF+vD7OwsRVFMx8Pyauj3+202m9lsNplMTqdTr9dTFBUXF5eSkpKZmSkWi7OysnJycvh8fsBUZ2dntbW1drudC6ympiaDwSCTyYRCYbhXQ4qiCIKYmpqqrKwMWDE/P39ycpIgCK/X+7+El5eX6enpXO8/uru7397ewncbulyutbW1mpoahLE2NjYeHx//m9NqtUql0vDs1wYGBkiS5ByLJMnNzc2SkpIQhyuXy+12++e0bW1t4dzfTk9Pc4t1e3vb0tLC1nClUunp6enfzEtLS+E/D+zv73OC5fP5NjY2MAxjfcRqtdpms/F4P3BclUgkDoeDZSyKoiYmJrgbdHV19U8dNpVKJZtYJEkODw9HcVPh/v6eHSyapkdGRqK7AzM4OMgO1sLCQix0rCwWS6hYJycnMdLeW1xcDAnr5eWlvLw8RrDq6up8Ph861vj4eCRPLzk5uaenR6FQdHV1sbKh+eYxHwDr5uYmYpkUCsXFxcXnw4rH49HpdL29vaGk3draQsTq7++PQCaRSLS3t/fNsHd2dhITE9GSj42NoWAZjcYIlMIwTKfTBXx6HB0doeVvaGhAwZqZmYlALLVaHeR2R6VSIb86YoZFkmTY+iTBR319ffAdFbfbLZFIEKo8PDww65Te3d1pNJrQl6rW1laBQOD1eufn5w0GQ4gJ29vbg+my/g2hUNjZ2dnc3My0is/nY9YpXVlZCWVWfX19BEF8/hbQNH11dTU0NBRKWr1ez+jkr9VqEaqYTCZmtyHyOpiamrq7u/vNBA4PD/Py8tCSezweRlgWiwWhitFoZIZVUFCAUIbH42m12oBzIAgCYQOJYRjT7pvNZuMcy+l0on3y6+vrQU5jdXU1SrCsVivXS9XHxwfTVt+PY33dw6VpGqFGR0dH8EsVjuNhfjERenyNRZIkQq7CwkJG1xcXF0cDFvKRjdH1aWlpsYuF4zij64O/Z6MQK+oDsAALsAALsAALArAAC7AAC7AACwKwGMTX7w1xHJfL5ZzXTkjgugqfz0co8b/fSWDwxz1wGwIWYAEWYAEWEAAWYAEWYAFWzMcfiJCug71TKOIAAAAASUVORK5CYII=)
[![Desenvolupat amb Angular](https://img.shields.io/badge/Desenvolupat%20amb-Angular-339933?style=flat&logo=Angular&logoColor=white)](https://github.com/xsastre)
![Release v1.1](https://img.shields.io/badge/release-v1.1-blue)
![License: MIT](https://img.shields.io/badge/license-MIT-green)


Desenvolupament d'un frontend Angular per a la pràctica de reserves de vols. Aquest repositori conté la interfície en Angular (v21) amb autenticació JWT, serveis HTTP per a vols i reserves, i una suite de proves ràpides per a l'API (scripts i col·lecció de Postman).

## Contingut

- `src/` - codi font de l'aplicació Angular
- `docs/` - documentació i recursos de prova

  - `api-smoke-tests.md` — resums dels tests realitzats
  - `reserves-api.postman_collection.json` — col·lecció Postman per a proves ràpides
  - `reserves-api.postman_environment.json` — variables d'entorn Postman
- `scripts/api_smoke.ps1` — script PowerShell que crea un usuari de prova, inicia sessió i crea una reserva

## Requisits

- Node.js 18+ i `npm` (gestor de paquets).
- Backend API en marxa a `http://localhost:3000` per provar funcionalitats autenticades (registre, login, reserves).

## Instal·lació

1. Clona el repositori:

```bash
git clone git@github.com:xsastre/DWEC2526Frontend-reserva-vols.git
cd DWEC2526Frontend-reserva-vols
```

1. Instal·la dependències:

```bash
npm install
```

1. Inicia el servidor de desenvolupament (frontend):

```bash
# Serveix l'aplicació (per defecte intenta el port 4200, canvia amb --port)
npx ng serve --port 4200
```

Si el port 4200 està ocupat, el servidor triarà un port alternatiu o pots especificar-ne un altre amb `--port`.

## Disseny i estil (v1.1)

La versió `v1.1` incorpora Angular Material i un tema preconstruït (`indigo-pink`). S'ha habilitat el suport d'animacions i fonts Roboto + Material Icons.

## Proves ràpides de l'API

Hi ha diverses formes de provar l'API:

- PowerShell (script ja inclòs):

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\api_smoke.ps1
```

Aquest script registra un usuari de prova, inicia sessió, consulta vols i crea una reserva.


- Curl / bash: consulta `docs/api-smoke-tests.md` per als exemples `curl` i resultats obtinguts.

- Bash (Linux/macOS): hem afegit un script `scripts/api_smoke.sh` que fa les mateixes accions (requereix `jq`). Exemple d'ús:

```bash
# Assegura permisos d'execució (si cal)
chmod +x scripts/api_smoke.sh
./scripts/api_smoke.sh
```

El script pot llegir la variable d'entorn `BASE_URL` per canviar l'API base, i també `EMAIL` i `PASSWORD` per personalitzar l'usuari de prova.

Si no tens `jq` instal·lat, instal·la'l (ex.: `sudo apt install jq` o `brew install jq`).

- Postman: importa `docs/reserves-api.postman_collection.json` i l'entorn `docs/reserves-api.postman_environment.json` i fes servir la variable `token` obtinguda al fer login.

## Endpoints principals

- `GET /api/flights` — llista de vols (públic)
- `POST /api/auth/register` — registre d'usuari (retorna token)
- `POST /api/auth/login` — login (retorna token)
- `GET /api/bookings` — llista de reserves de l'usuari (requereix `Authorization: Bearer <JWT>`)
- `POST /api/bookings` — crea reserva (`{ "flightId": <id>, "passengers": <n> }`)

## Flux d'us (UI)

1. Registra't o inicia sessió a la UI (`/register`, `/login`).
2. Navega a `Vols` per cercar i reservar vols.
3. Consulta `Les meves reserves` per veure les reserves creades (perfil autenticat).

## Preparar una release local

Hem creat les etiquetes (`v1.0`, `v1.1`) al repositori. Per pujar-les al remote:

```bash
git push origin master
git push origin --tags
```

## Contribuir

Si vols col·laborar, obre una _issue_ o envia un _pull request_.

## Llicència

Aquest projecte es publica sota llicència MIT — afegeix un fitxer `LICENSE` si no existeix.


