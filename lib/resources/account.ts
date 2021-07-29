import { HttpOpts } from '../client/types';
import api from '../client/api';
import { getQuerystring } from '../utils';
import * as types from './account-types';

const create = (opts: HttpOpts, account: types.Account) =>
	api.post(opts, '/accounts', account);

const getOne = (opts: HttpOpts, _id: string) => api.get(opts, '/accounts', _id);

const exists = (opts: HttpOpts, _query: Record<string, any>) =>
	api.get(opts, '/accounts/exists', null, null, getQuerystring(_query));

export default {
	create: create as unknown as OmitFirstArg<typeof create>,
	getOne: getOne as unknown as OmitFirstArg<typeof getOne>,
	exists: exists as unknown as OmitFirstArg<typeof exists>,
};
