import { HttpOpts } from '../client/types';
import api from '../client/api';
import * as types from './transfer-types';

const getOne = (opts: HttpOpts, _id: string) =>
	api.get(opts, '/transfers', _id);

const getAll = (opts: HttpOpts) => api.get(opts, '/transfers');

const reverse = (opts: HttpOpts, _id: string) =>
	api.post(opts, `/transfers/${_id}/reverse`);

const create = (opts: HttpOpts, transfer: types.Transfer) =>
	api.post(opts, '/transfers', transfer);

export default {
	getOne: getOne as unknown as OmitFirstArg<typeof getOne>,
	getAll: getAll as unknown as OmitFirstArg<typeof getAll>,
	reverse: reverse as unknown as OmitFirstArg<typeof reverse>,
	create: create as unknown as OmitFirstArg<typeof create>,
};
