import { HttpOpts } from 'lib/client/types';
import api from '../client/api';
import { endpoints } from '../client/endpoints';
import { getQuerystring } from '../utils';

const getOne = (opts: HttpOpts, _id: string) =>
	api.get(opts, null, null, {
		customUrl: `${endpoints[opts.env].v2.url}/webhooks?resourceId=${_id}`,
	});

const query = (opts: HttpOpts, _query: { filters: Record<string, any> }) =>
	api.get(opts, '/webhooks', null, null, getQuerystring(_query));

const getAll = (opts: HttpOpts) => api.get(opts, '/webhooks');

export default {
	getOne,
	query,
	getAll,
};
