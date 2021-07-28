import { HttpOpts } from '../client/types';
import api from '../client/api';
import { getQuerystring } from '../utils';
import { Customer } from './customer';

export namespace Order.Create {
	export type Payload = {
		ownId: string;
		amount: {
			currency: 'BRL';
			subtotals?: {
				shipping: number;
			};
		};
		items: Array<{
			product: string;
			category?: string;
			quantity: number;
			detail?: string;
			price: number;
		}>;
		customer: Customer.Create.Payload & { id?: string };
		receivers?: {
			type: string;
			feePayor: boolean;
			moipAccount: {
				id: string;
			};
			amount: {
				fixed?: number;
				percentual?: number;
			};
		}[];
	};

	export type Response = {
		id: string;
		ownId: string;
		status: string;
		platform: string;
		createdAt: string;
		updatedAt: string;
		amount: {
			paid: number;
			total: number;
			fees: number;
			refunds: number;
			liquid: number;
			otherReceivers: number;
			currency: 'BRL';
			subtotals: {
				shipping: number;
				addition: number;
				discount: number;
				items: number;
			};
		};
		items: {
			price: number;
			detail: string;
			quantity: number;
			product: string;
			category: string;
		}[];
		addresses: {
			streetNumber: string;
			street: string;
			city: string;
			complement: string;
			district: string;
			zipCode: string;
			state: string;
			type: string;
			country: string;
		}[];
		customer: Customer.Create.Response;
		payments: [];
		escrows: [];
		refunds: [];
		entries: [];
		events: {
			type: string;
			createdAt: string;
			description: string;
		}[];
		receivers: {
			moipAccount: {
				id: string;
				login: string;
				fullname: string;
			};
			type: 'PRIMARY' | 'SECONDARY';
			amount: {
				total: number;
				fees: number;
				refunds: number;
			};
			feePayor: boolean;
		}[];
		_links: {
			self: {
				href: string;
			};
			checkout: {
				payCheckout: {
					redirectHref: string;
				};
				payCreditCard: {
					redirectHref: string;
				};
				payBoleto: {
					redirectHref: string;
				};
				payOnlineBankDebitItau: {
					redirectHref: string;
				};
			};
		};
	};
}

export type RefundMethod = 'CREDIT_CARD' | 'MOIP_ACCOUNT' | 'BANK_ACCOUNT';

const getOne = (opts: HttpOpts, _id: string) => api.get(opts, '/orders', _id);

const getAll = (opts: HttpOpts) => api.get(opts, '/orders');

const query = (opts: HttpOpts, _query: { filters: Record<string, any> }) =>
	api.get(opts, '/orders', null, null, getQuerystring(_query));

const create = (opts: HttpOpts, order: Order.Create.Payload) =>
	api.post(opts, '/orders', order) as Promise<Order.Create.Response>;

const refund = (opts: HttpOpts, _id: string, method: RefundMethod) =>
	api.post(opts, `/orders/${_id}/refunds`, method || null);

const getRefunds = (opts: HttpOpts, _id: string) =>
	api.get(opts, `/orders/${_id}/refunds`);

export default {
	getOne: getOne as unknown as OmitFirstArg<typeof getOne>,
	getAll: getAll as unknown as OmitFirstArg<typeof getAll>,
	create: create as unknown as OmitFirstArg<typeof create>,
	query: query as unknown as OmitFirstArg<typeof query>,
	refunds: {
		refund: refund as unknown as OmitFirstArg<typeof refund>,
		getRefunds: getRefunds as unknown as OmitFirstArg<typeof getRefunds>,
	},
};
