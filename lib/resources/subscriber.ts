import { HttpConfig, HttpOpts } from '../client/types';
import api from '../client/api_assinaturas';

export type Subscriber = {};

export type BillingInfo = {};

const getOne = (opts: HttpOpts, _code: string) =>
	api.get(opts, `/customers/${_code}`);

const getAll = (opts: HttpOpts) => api.get(opts, '/customers');

const create = (opts: HttpOpts, subscriber: Subscriber, config: HttpConfig) =>
	api.post(opts, '/customers', subscriber, config);

const update = (opts: HttpOpts, _code: string, subscriber: Subscriber) =>
	api.put(opts, `/customers/${_code}`, subscriber);

const updateBilling = (
	opts: HttpOpts,
	_code: string,
	billingInfo: BillingInfo
) => api.put(opts, `/customers/${_code}/billing_infos`, billingInfo);

export default {
	getOne,
	getAll,
	create,
	update,
	updateBilling,
};
