# n8n-nodes-parcel-app

This is an [n8n](https://n8n.io/) community node for the [Parcel](https://parcelapp.net) delivery tracking API.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

### Get Deliveries

Retrieve your tracked deliveries with an optional filter:

- **Recent** — recently updated deliveries (default)
- **Active** — currently active deliveries only

### Add Delivery

Add a new delivery to track:

- **Tracking Number** — the shipment tracking number
- **Carrier Code** — the carrier identifier (e.g. `ups`, `fedex`, `dhl`). Full list: [supported_carriers.json](https://api.parcel.app/external/supported_carriers.json)
- **Description** — a label for the delivery
- **Language** (optional) — ISO 639-1 language code (default: `en`)
- **Send Push Confirmation** (optional) — send a push notification on success

## Credentials

You need a Parcel API key. Generate one at [web.parcelapp.net](https://web.parcelapp.net).

## Rate Limits

- **Get Deliveries:** 20 requests per hour
- **Add Delivery:** 20 requests per day

## Resources

- [Parcel API — View Deliveries](https://parcelapp.net/help/api-view-deliveries.html)
- [Parcel API — Add Delivery](https://parcelapp.net/help/api-add-delivery.html)
- [n8n Community Nodes Documentation](https://docs.n8n.io/integrations/community-nodes/)

## License

[MIT](LICENSE)
