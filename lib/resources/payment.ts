import { HttpOpts } from '../client/types';
import api from '../client/api';
import { endpoints } from '../client/endpoints';

export type Payment = {
	installmentCount: number;
	fundingInstrument: {
		method: 'CREDIT_CARD' | 'BOLETO' | 'ONLINE_BANK_DEBIT';
		creditCard: CreditCard;
	};
};

export type CreditCard = {
	hash: string;
	holder: {
		fullname: string;
		birthdate: string;
		taxDocument: {
			type: 'CPF' | 'CNPJ';
			number: string;
		};
		phone: {
			countryCode: string;
			areaCode: string;
			number: string;
		};
	};
};

export type Refund = {};

const getOne = (opts: HttpOpts, _id: string) => api.get(opts, '/payments', _id);

const create = (opts: HttpOpts, orderId: string, payment: Payment) =>
	api.post(opts, `/orders/${orderId}/payments`, payment);

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
	getOne,
	create,
	preAuthorizationCapture,
	preAuthorizationCancel,
	_authorize,
	refunds: {
		create: refund,
		get: getRefunds,
	},
};
