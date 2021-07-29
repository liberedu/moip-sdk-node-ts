import { HttpOpts } from '../client/types';
import api from '../client/api';
import * as types from './multipayment-types';

const getOne = (opts: HttpOpts, _id: string) =>
	api.get(opts, '/multipayments', _id);

const create = (
	opts: HttpOpts,
	multiorderId: string,
	multipayment: types.MultiPayment
) => api.post(opts, `/multiorders/${multiorderId}/multipayments`, multipayment);

const preAuthorizationCapture = (opts: HttpOpts, _id: string) =>
	api.post(opts, `/multipayments/${_id}/capture`);

const preAuthorizationCancel = (opts: HttpOpts, _id: string) =>
	api.post(opts, `/multipayments/${_id}/void`);

export default {
	getOne: getOne as unknown as OmitFirstArg<typeof getOne>,
	create: create as unknown as OmitFirstArg<typeof create>,
	preAuthorizationCapture: preAuthorizationCapture as unknown as OmitFirstArg<
		typeof preAuthorizationCapture
	>,
	preAuthorizationCancel: preAuthorizationCancel as unknown as OmitFirstArg<
		typeof preAuthorizationCancel
	>,
};
