import { NodeConnectionTypes } from 'n8n-workflow';
import type { INodeType, INodeTypeDescription } from 'n8n-workflow';

export class ParcelApp implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Parcel App',
		name: 'parcelApp',
		icon: 'file:parcelApp.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"]}}',
		description: 'Track deliveries using the Parcel App API',
		defaults: {
			name: 'Parcel App',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'parcelAppApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://api.parcel.app/external',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			// Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Get Deliveries',
						value: 'getDeliveries',
						action: 'Get deliveries',
						description: 'Retrieve a list of deliveries',
						routing: {
							request: {
								method: 'GET',
								url: '/deliveries/',
							},
						},
					},
					{
						name: 'Add Delivery',
						value: 'addDelivery',
						action: 'Add a delivery',
						description: 'Add a new delivery to track',
						routing: {
							request: {
								method: 'POST',
								url: '/add-delivery/',
							},
						},
					},
				],
				default: 'getDeliveries',
			},

			// --- Get Deliveries fields ---
			{
				displayName: 'Filter Mode',
				name: 'filterMode',
				type: 'options',
				options: [
					{
						name: 'Recent',
						value: 'recent',
					},
					{
						name: 'Active',
						value: 'active',
					},
				],
				default: 'recent',
				description: 'Filter deliveries by status',
				displayOptions: {
					show: {
						operation: ['getDeliveries'],
					},
				},
				routing: {
					request: {
						qs: {
							filter_mode: '={{$value}}',
						},
					},
				},
			},

			// --- Add Delivery fields ---
			{
				displayName: 'Tracking Number',
				name: 'trackingNumber',
				type: 'string',
				default: '',
				required: true,
				description: 'The tracking number of the delivery',
				displayOptions: {
					show: {
						operation: ['addDelivery'],
					},
				},
				routing: {
					request: {
						body: {
							tracking_number: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Carrier Code',
				name: 'carrierCode',
				type: 'string',
				default: '',
				required: true,
				description:
					'Internal carrier code (e.g. "ups", "fedex", "dhl"). Use "pholder" for placeholder deliveries. Full list: https://api.parcel.app/external/supported_carriers.json',
				displayOptions: {
					show: {
						operation: ['addDelivery'],
					},
				},
				routing: {
					request: {
						body: {
							carrier_code: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				required: true,
				description: 'A description for the delivery',
				displayOptions: {
					show: {
						operation: ['addDelivery'],
					},
				},
				routing: {
					request: {
						body: {
							description: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				default: {},
				placeholder: 'Add Field',
				displayOptions: {
					show: {
						operation: ['addDelivery'],
					},
				},
				options: [
					{
						displayName: 'Language',
						name: 'language',
						type: 'string',
						default: 'en',
						description: 'Two-letter ISO 639-1 language code for delivery information',
						routing: {
							request: {
								body: {
									language: '={{$value}}',
								},
							},
						},
					},
					{
						displayName: 'Send Push Confirmation',
						name: 'sendPushConfirmation',
						type: 'boolean',
						default: false,
						description: 'Whether to send a push notification on successful addition',
						routing: {
							request: {
								body: {
									send_push_confirmation: '={{$value}}',
								},
							},
						},
					},
				],
			},
		],
	};
}
