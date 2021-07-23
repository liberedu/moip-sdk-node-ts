import { HttpOpts } from '../client/types';
import api from '../client/api_assinaturas';

export type Plan = {
	code: string;
	name: string;
	description: string;
	amount: number;
	setup_fee: number;
	max_qty: number;
	interval: {
		length: number;
		unit: 'DAY' | 'MONTH' | 'YEAR';
	};
	billing_cycles: number;
	trial: {
		days: number;
		enabled: boolean;
		hold_setup_fee: boolean;
	};
	payment_method: 'BOLETO' | 'CREDIT_CARD' | 'ALL';
};

const getOne = (opts: HttpOpts, _code: string) =>
	api.get(opts, `/plans/${_code}`);

const getAll = (opts: HttpOpts) => api.get(opts, '/plans');

const create = (opts: HttpOpts, plan: Plan) => api.post(opts, '/plans', plan);

const activate = (opts: HttpOpts, _code: string) =>
	api.put(opts, `/plans/${_code}/activate`);

const inactivate = (opts: HttpOpts, _code: string) =>
	api.put(opts, `/plans/${_code}/inactivate`);

const update = (opts: HttpOpts, _code: string, plan: Plan) =>
	api.put(opts, `/plans/${_code}`, plan);

export default {
	getOne: getOne,
	getAll: getAll,
	create: create,
	activate: activate,
	inactivate: inactivate,
	update: update,
};
