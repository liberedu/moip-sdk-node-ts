import { HttpOpts } from '../client/types';
import api from '../client/api';
import { endpoints } from '../client/endpoints';
import * as types from './payment-types';

const getOne = (opts: HttpOpts, _id: string) => api.get(opts, '/payments', _id);

const create = (
	opts: HttpOpts,
	orderId: string,
	payment: types.Payment.Create.Payload
) =>
	api.post(
		opts,
		`/orders/${orderId}/payments`,
		payment
	) as Promise<types.Payment.Create.Response>;

const preAuthorizationCapture = (opts: HttpOpts, _id: string) =>
	api.post(
		opts,
		`/payments/${_id}/capture`
	) as Promise<types.Payment.Capture.Response>;

const preAuthorizationCancel = (opts: HttpOpts, _id: string) =>
	api.post(
		opts,
		`/payments/${_id}/void`
	) as Promise<types.Payment.Cancel.Response>;

const _authorize = (opts: HttpOpts, _id: string, amount: string) =>
	api.get(opts, null, null, {
		customUrl: `${endpoints.sandbox.v2.authorizePaymentSimulationUrl}?payment_id=${_id}&amount${amount}`,
	});

const refund = (opts: HttpOpts, _id: string, refund: types.Refund) =>
	api.post(opts, `/payments/${_id}/refunds`, refund);

const getRefunds = (opts: HttpOpts, _id: string) =>
	api.get(opts, `/payments/${_id}/refunds`);

export default {
	getOne: getOne as unknown as OmitFirstArg<typeof getOne>,
	create: create as unknown as OmitFirstArg<typeof create>,
	preAuthorizationCapture: preAuthorizationCapture as unknown as OmitFirstArg<
		typeof preAuthorizationCapture
	>,
	preAuthorizationCancel: preAuthorizationCancel as unknown as OmitFirstArg<
		typeof preAuthorizationCancel
	>,
	_authorize: _authorize as unknown as OmitFirstArg<typeof _authorize>,
	refunds: {
		refund: refund as unknown as OmitFirstArg<typeof refund>,
		getRefunds: getRefunds as unknown as OmitFirstArg<typeof getRefunds>,
	},
};
