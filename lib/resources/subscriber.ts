import { HttpConfig, HttpOpts } from '../client/types';
import api from '../client/api_assinaturas';
import * as types from './subscriber-types';

const getOne = (opts: HttpOpts, _code: string) =>
	api.get(opts, `/customers/${_code}`);

const getAll = (opts: HttpOpts) => api.get(opts, '/customers');

const create = (
	opts: HttpOpts,
	subscriber: types.Subscriber,
	config: HttpConfig
) => api.post(opts, '/customers', subscriber, config);

const update = (opts: HttpOpts, _code: string, subscriber: types.Subscriber) =>
	api.put(opts, `/customers/${_code}`, subscriber);

const updateBilling = (
	opts: HttpOpts,
	_code: string,
	billingInfo: types.BillingInfo
) => api.put(opts, `/customers/${_code}/billing_infos`, billingInfo);

export default {
	getOne: getOne as unknown as OmitFirstArg<typeof getOne>,
	getAll: getAll as unknown as OmitFirstArg<typeof getAll>,
	create: create as unknown as OmitFirstArg<typeof create>,
	update: update as unknown as OmitFirstArg<typeof update>,
	updateBilling: updateBilling as unknown as OmitFirstArg<typeof updateBilling>,
};
