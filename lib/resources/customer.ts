import { HttpOpts } from '../client/types';
import api from '../client/api';
import { getQuerystring } from '../utils';
import { CreditCard } from './payment';

export type Customer = {
	ownId: string;
	fullname: string;
	email: string;
	birthDate: string;
	taxDocument: {
		type: string;
		number: string;
	};
	phone: {
		countryCode: string;
		areaCode: string;
		number: string;
	};
	shippingAddress: {
		city: string;
		complement?: string;
		district: string;
		street: string;
		streetNumber: string;
		zipCode: string;
		state: string;
		country: string;
	};
};

const getOne = (opts: HttpOpts, _id: string) =>
	api.get(opts, '/customers', _id);

const getAll = (opts: HttpOpts) => api.get(opts, '/customers');

const query = (opts: HttpOpts, _query: { filters: Record<string, any> }) =>
	api.get(opts, '/customers', null, null, getQuerystring(_query));

const create = (opts: HttpOpts, customer: Customer) =>
	api.post(opts, '/customers', customer);

const createCreditCard = (
	opts: HttpOpts,
	_id: string,
	creditCard: CreditCard
) => api.post(opts, `/customers/${_id}/fundinginstruments`, creditCard);

const removeCreditCard = (opts: HttpOpts, _id: string) =>
	api.remove(opts, `/fundinginstruments/${_id}`);

export default {
	getOne: getOne,
	getAll: getAll,
	create: create,
	query: query,
	createCreditCard: createCreditCard,
		typeof createCreditCard
	>,
	removeCreditCard: removeCreditCard,
		typeof removeCreditCard
	>,
};
