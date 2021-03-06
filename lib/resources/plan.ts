import { HttpOpts } from '../client/types';
import api from '../client/api_assinaturas';
import * as types from './plan-types';

const getOne = (opts: HttpOpts, _code: string) =>
	api.get(opts, `/plans/${_code}`);

const getAll = (opts: HttpOpts) => api.get(opts, '/plans');

const create = (opts: HttpOpts, plan: types.Plan) =>
	api.post(opts, '/plans', plan);

const activate = (opts: HttpOpts, _code: string) =>
	api.put(opts, `/plans/${_code}/activate`);

const inactivate = (opts: HttpOpts, _code: string) =>
	api.put(opts, `/plans/${_code}/inactivate`);

const update = (opts: HttpOpts, _code: string, plan: types.Plan) =>
	api.put(opts, `/plans/${_code}`, plan);

export default {
	getOne: getOne as unknown as OmitFirstArg<typeof getOne>,
	getAll: getAll as unknown as OmitFirstArg<typeof getAll>,
	create: create as unknown as OmitFirstArg<typeof create>,
	activate: activate as unknown as OmitFirstArg<typeof activate>,
	inactivate: inactivate as unknown as OmitFirstArg<typeof inactivate>,
	update: update as unknown as OmitFirstArg<typeof update>,
};
