import { HttpOpts } from '../client/types';
import api from '../client/api';
import * as types from './multiorder-types';

const getOne = (opts: HttpOpts, _id: string) =>
	api.get(opts, '/multiorders', _id);

const create = (opts: HttpOpts, multiorder: types.MultiOrder) =>
	api.post(opts, '/multiorders', multiorder);

export default {
	getOne: getOne as unknown as OmitFirstArg<typeof getOne>,
	create: create as unknown as OmitFirstArg<typeof create>,
};
