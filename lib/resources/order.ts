import { HttpOpts } from '../client/types';
import api from '../client/api';
import { getQuerystring } from '../utils';
import * as types from './order-types';

export type RefundMethod = 'CREDIT_CARD' | 'MOIP_ACCOUNT' | 'BANK_ACCOUNT';

const getOne = (opts: HttpOpts, _id: string) => api.get(opts, '/orders', _id);

const getAll = (opts: HttpOpts) => api.get(opts, '/orders');

const query = (opts: HttpOpts, _query: { filters: Record<string, any> }) =>
	api.get(opts, '/orders', null, null, getQuerystring(_query));

const create = (opts: HttpOpts, order: types.Order.Create.Payload) =>
	api.post(opts, '/orders', order) as Promise<types.Order.Create.Response>;

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
