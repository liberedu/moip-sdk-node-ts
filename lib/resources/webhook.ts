import { HttpOpts } from '../client/types';
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
	getOne: getOne as unknown as OmitFirstArg<typeof getOne>,
	query: query as unknown as OmitFirstArg<typeof query>,
	getAll: getAll as unknown as OmitFirstArg<typeof getAll>,
};
