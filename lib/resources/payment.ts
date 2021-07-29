import { HttpOpts } from '../client/types';
import api from '../client/api';
import { endpoints } from '../client/endpoints';

export namespace Payment.Create {
	export type Payload = {
		installmentCount?: number;
		statementDescriptor?: string;
		delayCapture?: boolean;
		fundingInstrument: {
			method: 'CREDIT_CARD' | 'BOLETO' | 'ONLINE_BANK_DEBIT';
			creditCard?: CreditCard;
		};
		boleto?: {
			expirationDate: string;
			instructionLines?: {
				first: string;
				second?: string;
				third?: string;
			};
			logoUri?: string;
		};
		onlineBankDebit?: {
			bankNumber: '341';
			expirationDate?: string;
			returnUri?: string;
		};
	};

	export type Response = {
		id: string;
		status: string;
		delayCapture: boolean;
		amount: {
			total: number;
			gross: number;
			fees: number;
			refunds: number;
			liquid: number;
			currency: 'BRL';
		};
		installmentCount: number;
		statementDescriptor: string;
		fundingInstrument: {
			creditCard: {
				id: string;
				brand: string;
				first6: string;
				last4: string;
				store: boolean;
				holder: {
					birthdate: string;
					birthDate: string;
					taxDocument: {
						type: string;
						number: string;
					};
					billingAddress: {
						street: string;
						streetNumber: string;
						district: string;
						city: string;
						state: string;
						country: string;
						zipCode: string;
					};
					fullname: string;
				};
			};
			method: string;
		};
		fees: {
			type: string;
			amount: number;
		}[];
		events: {
			type: string;
			createdAt: string;
		}[];
		receivers: {
			moipAccount: {
				id: string;
				login: string;
				fullname: string;
			};
			type: string;
			amount: {
				total: number;
				refunds: number;
			};
		}[];
		device: {
			userAgent: string;
			ip: string;
			geolocation: {
				latitude: number;
				longitude: number;
			};
			fingerprint: string;
		};
		_links: {
			self: {
				href: string;
			};
			order: {
				href: string;
				title: string;
			};
		};
		createdAt: string;
		updatedAt: string;
	};
}

export type CreditCard = {
	hash: string;
	holder: {
		fullname: string;
		birthdate?: string;
		taxDocument: {
			type: 'CPF' | 'CNPJ';
			number: string;
		};
		phone: {
			countryCode: string;
			areaCode: string;
			number: string;
		};
		billingAddress?: {
			city: string;
			district: string;
			street: string;
			streetNumber: string;
			zipCode: string;
			state: string;
			country: string;
		};
	};
};

export type Refund = {};

const getOne = (opts: HttpOpts, _id: string) => api.get(opts, '/payments', _id);

const create = (
	opts: HttpOpts,
	orderId: string,
	payment: Payment.Create.Payload
) =>
	api.post(
		opts,
		`/orders/${orderId}/payments`,
		payment
	) as Promise<Payment.Create.Response>;

const preAuthorizationCapture = (opts: HttpOpts, _id: string) =>
	api.post(opts, `/payments/${_id}/capture`);

const preAuthorizationCancel = (opts: HttpOpts, _id: string) =>
	api.post(opts, `/payments/${_id}/void`);

const _authorize = (opts: HttpOpts, _id: string, amount: string) =>
	api.get(opts, null, null, {
		customUrl: `${endpoints.sandbox.v2.authorizePaymentSimulationUrl}?payment_id=${_id}&amount${amount}`,
	});

const refund = (opts: HttpOpts, _id: string, refund: Refund) =>
	api.post(opts, `/payments/${_id}/refunds`, refund);

const getRefunds = (opts: HttpOpts, _id: string) =>
	api.get(opts, `/payments/${_id}/refunds`);

export default {
	getOne: getOne as unknown as OmitFirstArg<typeof getOne>,
	create: create as unknown as OmitFirstArg<typeof create>,
	preAuthorizationCapture: preAuthorizationCapture as unknown as OmitFirstArg<
		typeof preAuthorizationCapture
	>,
	preAuthorizationCancel: preAuthorizationCancel as unknown as OmitFirstArg<
		typeof preAuthorizationCancel
	>,
	_authorize: _authorize as unknown as OmitFirstArg<typeof _authorize>,
	refunds: {
		refund: refund as unknown as OmitFirstArg<typeof refund>,
		getRefunds: getRefunds as unknown as OmitFirstArg<typeof getRefunds>,
	},
};
