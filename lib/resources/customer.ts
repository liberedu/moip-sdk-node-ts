import { HttpOpts } from '../client/types';
import api from '../client/api';
import { getQuerystring } from '../utils';
import { CreditCard } from './payment-types';
import * as types from './customer-types';

const getOne = (opts: HttpOpts, _id: string) =>
	api.get(opts, '/customers', _id) as Promise<types.Customer.GetOne.Response>;

const getAll = (opts: HttpOpts) => api.get(opts, '/customers');

const query = (opts: HttpOpts, _query: { filters: Record<string, any> }) =>
	api.get(opts, '/customers', null, null, getQuerystring(_query));

const create = (opts: HttpOpts, customer: types.Customer.Create.Payload) =>
	api.post(
		opts,
		'/customers',
		customer
	) as Promise<types.Customer.Create.Response>;

const createCreditCard = (
	opts: HttpOpts,
	_id: string,
	creditCard: CreditCard
) => api.post(opts, `/customers/${_id}/fundinginstruments`, creditCard);

const removeCreditCard = (opts: HttpOpts, _id: string) =>
	api.remove(opts, `/fundinginstruments/${_id}`);

export default {
	getOne: getOne as unknown as OmitFirstArg<typeof getOne>,
	getAll: getAll as unknown as OmitFirstArg<typeof getAll>,
	create: create as unknown as OmitFirstArg<typeof create>,
	query: query as unknown as OmitFirstArg<typeof query>,
	createCreditCard: createCreditCard as unknown as OmitFirstArg<
		typeof createCreditCard
	>,
	removeCreditCard: removeCreditCard as unknown as OmitFirstArg<
		typeof removeCreditCard
	>,
};
