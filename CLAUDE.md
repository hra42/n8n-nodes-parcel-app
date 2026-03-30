# Parcel App n8n Community Node

## Project Overview

This is an n8n community node package that integrates with the [Parcel](https://parcelapp.net) delivery tracking API. It allows n8n workflow users to view and add deliveries via the Parcel API.

## Tech Stack

- **Language:** TypeScript
- **Runtime:** Node.js (ES2019 target)
- **Framework:** n8n community node (declarative style)
- **Build:** `@n8n/node-cli`
- **Peer dependency:** `n8n-workflow`

## Project Structure

```
n8n-nodes-parcel-app/
├── credentials/
│   └── ParcelAppApi.credentials.ts     # API key credential
├── nodes/
│   └── ParcelApp/
│       ├── ParcelApp.node.ts           # Main node definition
│       └── parcelApp.svg               # Node icon (SVG)
├── package.json
├── tsconfig.json
└── CLAUDE.md
```

## n8n Node Conventions

- **Package name:** `n8n-nodes-parcel-app`
- **Node class name:** `ParcelApp` (PascalCase)
- **Credential class name:** `ParcelAppApi`
- **File naming:** PascalCase for `.node.ts` and `.credentials.ts`
- **Icon:** SVG file, lowercase camelCase name, placed next to node file
- **`n8n` field in package.json:** must list `dist/` paths for nodes and credentials
- **Keyword:** `n8n-community-node-package` required in package.json
- **Build output:** `dist/` directory

## Parcel API Reference

### Authentication

- **Header:** `api-key: <YOUR_API_KEY>`
- API keys are generated at https://web.parcelapp.net

### Base URL

```
https://api.parcel.app/external/
```

### Endpoints

#### GET `/deliveries/` — View Deliveries

- **Query param:** `filter_mode` (optional): `"active"` or `"recent"` (default: `"recent"`)
- **Rate limit:** 20 requests per hour (cached responses)
- **Response:**
  ```json
  {
    "success": true,
    "deliveries": [
      {
        "carrier_code": "string",
        "description": "string",
        "status_code": 0,
        "tracking_number": "string",
        "events": [
          {
            "event": "string",
            "date": "string",
            "location": "string (optional)",
            "additional": "string (optional)"
          }
        ],
        "extra_information": "string (optional)",
        "date_expected": "string (optional)",
        "date_expected_end": "string (optional)",
        "timestamp_expected": 0,
        "timestamp_expected_end": 0
      }
    ]
  }
  ```
- **Status codes:** 0=completed, 1=frozen, 2=in transit, 3=awaiting pickup, 4=out for delivery, 5=not found, 6=failed attempt, 7=exception, 8=received not yet picked up

#### POST `/add-delivery/` — Add Delivery

- **Rate limit:** 20 requests per day (including failed attempts)
- **Request body (JSON):**
  ```json
  {
    "tracking_number": "string (required)",
    "carrier_code": "string (required)",
    "description": "string (required)",
    "language": "string (optional, ISO 639-1, default: 'en')",
    "send_push_confirmation": false
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "error_message": "string (only on error)"
  }
  ```
- **Constraints:** Single delivery per request; tracking numbers requiring extra input (email/postcode) are unsupported; `carrier_code` `"pholder"` for placeholder deliveries

#### GET `/supported_carriers.json` — List Carriers

- Returns JSON object mapping `carrier_code` → carrier display name
- ~334 carriers supported
- Full list: https://api.parcel.app/external/supported_carriers.json

## Build & Development Commands

```bash
npm install          # Install dependencies
npm run build        # Build the node
npm run build:watch  # Watch mode
npm run dev          # Development mode
npm run lint         # Run linter
npm run lint:fix     # Fix lint issues
```

## Local Testing with n8n

```bash
# In this project directory:
npm run build
npm link

# In your n8n installation directory:
npm link n8n-nodes-parcel-app

# Start n8n
n8n start
```

## Implementation Notes

- Use **declarative style** for the n8n node (routing-based, no `execute()` method)
- The node should expose two operations: **Get Deliveries** and **Add Delivery**
- `requestDefaults.baseURL` should be `https://api.parcel.app/external`
- Authentication is via a custom header `api-key`, not standard Bearer/Basic auth — use `ICredentialType` with `genericAuth` type `httpHeaderAuth` or manual header injection
- Error responses from the API include `success: false` and `error_message`
- All dates from the API are strings; timestamps are Unix epoch integers
