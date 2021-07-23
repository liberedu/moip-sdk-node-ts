import { HttpConfig, HttpOpts } from '../client/types';
import api from '../client/api_assinaturas';
import { NotificationPreferences } from './notification';

export type Subscription = {
	plan: {
		code: string;
	};
	amount: string;
	next_invoice_date: {
		day: string;
		month: string;
		year: string;
	};
};

export type SubscriptionPaymentMethod = 'BOLETO' | 'CREDIT_CARD';

const getOne = (opts: HttpOpts, _code: string) =>
	api.get(opts, `/subscriptions/${_code}`);

const getAll = (opts: HttpOpts) => api.get(opts, '/subscriptions');

const create = (
	opts: HttpOpts,
	subscription: Subscription,
	config: HttpConfig
) => api.post(opts, '/subscriptions', subscription, config);

const update = (opts: HttpOpts, _code: string, subscription: Subscription) =>
	api.put(opts, `/subscriptions/${_code}`, subscription);

const updatePaymentMethod = (
	opts: HttpOpts,
	_code: string,
	paymentMethod: SubscriptionPaymentMethod
) =>
	api.put(opts, `/subscriptions/${_code}/change_payment_method`, paymentMethod);

const suspend = (opts: HttpOpts, _code: string) =>
	api.put(opts, `/subscriptions/${_code}/suspend`);

const activate = (opts: HttpOpts, _code: string) =>
	api.put(opts, `/subscriptions/${_code}/activate`);

const cancel = (opts: HttpOpts, _code: string) =>
	api.put(opts, `/subscriptions/${_code}/cancel`);

const getOneInvoice = (opts: HttpOpts, _id: string) =>
	api.get(opts, `/invoices/${_id}`);

const getAllInvoices = (opts: HttpOpts, _code: string) =>
	api.get(opts, `/subscriptions/${_code}/invoices`);

const getOnePayment = (opts: HttpOpts, _id: string) =>
	api.get(opts, `/payments/${_id}`);

const getAllPayments = (opts: HttpOpts, _id: string) =>
	api.get(opts, `/invoices/${_id}/payments`);

const createNotification = (
	opts: HttpOpts,
	notification: NotificationPreferences
) => api.post(opts, '/users/preferences', notification);

export default {
	getOne: getOne as unknown as OmitFirstArg<typeof getOne>,
	getAll: getAll as unknown as OmitFirstArg<typeof getAll>,
	create: create as unknown as OmitFirstArg<typeof create>,
	update: update as unknown as OmitFirstArg<typeof update>,
	updatePaymentMethod: updatePaymentMethod as unknown as OmitFirstArg<
		typeof updatePaymentMethod
	>,
	suspend: suspend as unknown as OmitFirstArg<typeof suspend>,
	activate: activate as unknown as OmitFirstArg<typeof activate>,
	cancel: cancel as unknown as OmitFirstArg<typeof cancel>,
	getOneInvoice: getOneInvoice as unknown as OmitFirstArg<typeof getOneInvoice>,
	getAllInvoices: getAllInvoices as unknown as OmitFirstArg<
		typeof getAllInvoices
	>,
	getOnePayment: getOnePayment as unknown as OmitFirstArg<typeof getOnePayment>,
	getAllPayments: getAllPayments as unknown as OmitFirstArg<
		typeof getAllPayments
	>,
	createNotification: createNotification as unknown as OmitFirstArg<
		typeof createNotification
	>,
};
