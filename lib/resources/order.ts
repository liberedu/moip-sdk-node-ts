import { HttpOpts } from '../client/types';
import api from '../client/api';
import { getQuerystring } from '../utils';
import { Customer } from './customer';

export type Order = {
	ownId: '1521656695';
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
	customer: Customer;
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
	};
};

export type RefundMethod = 'CREDIT_CARD' | 'MOIP_ACCOUNT' | 'BANK_ACCOUNT';

const getOne = (opts: HttpOpts, _id: string) => api.get(opts, '/orders', _id);

const getAll = (opts: HttpOpts) => api.get(opts, '/orders');

const query = (opts: HttpOpts, _query: { filters: Record<string, any> }) =>
	api.get(opts, '/orders', null, null, getQuerystring(_query));

const create = (opts: HttpOpts, order: Order) =>
	api.post(opts, '/orders', order);

const refund = (opts: HttpOpts, _id: string, method: RefundMethod) =>
	api.post(opts, `/orders/${_id}/refunds`, method || null);

const getRefunds = (opts: HttpOpts, _id: string) =>
	api.get(opts, `/orders/${_id}/refunds`);

export default {
	getOne: getOne,
	getAll: getAll,
	create: create,
	query: query,
	refunds: {
		create: refund,
		get: getRefunds,
	},
};
