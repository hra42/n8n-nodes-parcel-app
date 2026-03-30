import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class ParcelAppApi implements ICredentialType {
	name = 'parcelAppApi';

	displayName = 'Parcel App API';

	documentationUrl = 'https://parcelapp.net/help/api-view-deliveries.html';

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			description: 'API key generated at https://web.parcelapp.net',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'api-key': '={{$credentials.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.parcel.app',
			url: '/external/deliveries/',
			method: 'GET',
		},
	};
}
