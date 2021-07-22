import { HttpOpts } from '../client/types';
import api from '../client/api_assinaturas';

export type Coupon = {
	code: string;
	name: string;
	description: string;
	discount: {
		value: number;
		type: 'percent' | 'amount';
	};
	status: 'active' | 'inactive';
	duration: {
		type: 'once' | 'repeating' | 'forever';
		occurrences: 12;
	};
	max_redemptions: number;
	expiration_date: {
		year: number;
		month: number;
		day: number;
	};
};

const getOne = (opts: HttpOpts, _code: string) =>
	api.get(opts, `/coupons/${_code}`);

const getAll = (opts: HttpOpts) => api.get(opts, '/coupons');

const create = (opts: HttpOpts, coupon: Coupon) =>
	api.post(opts, '/coupons', coupon);

const associate = (opts: HttpOpts, _code: string, coupon: Coupon) =>
	api.put(opts, `/subscriptions/${_code}`, coupon);

const activate = (opts: HttpOpts, _code: string) =>
	api.put(opts, `/coupons/${_code}/active`);

const inactivate = (opts: HttpOpts, _code: string) =>
	api.put(opts, `/coupons/${_code}/inactive`);

export default {
	getOne,
	getAll,
	create,
	associate,
	activate,
	inactivate,
};
