import { HttpOpts } from '../client/types';
import api from '../client/api_assinaturas';
import * as types from './coupon-types';

const getOne = (opts: HttpOpts, _code: string) =>
	api.get(opts, `/coupons/${_code}`);

const getAll = (opts: HttpOpts) => api.get(opts, '/coupons');

const create = (opts: HttpOpts, coupon: types.Coupon) =>
	api.post(opts, '/coupons', coupon);

const associate = (opts: HttpOpts, _code: string, coupon: types.Coupon) =>
	api.put(opts, `/subscriptions/${_code}`, coupon);

const activate = (opts: HttpOpts, _code: string) =>
	api.put(opts, `/coupons/${_code}/active`);

const inactivate = (opts: HttpOpts, _code: string) =>
	api.put(opts, `/coupons/${_code}/inactive`);

export default {
	getOne: getOne as unknown as OmitFirstArg<typeof getOne>,
	getAll: getAll as unknown as OmitFirstArg<typeof getAll>,
	create: create as unknown as OmitFirstArg<typeof create>,
	associate: associate as unknown as OmitFirstArg<typeof associate>,
	activate: activate as unknown as OmitFirstArg<typeof activate>,
	inactivate: inactivate as unknown as OmitFirstArg<typeof inactivate>,
};
