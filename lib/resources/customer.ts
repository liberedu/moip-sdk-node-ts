import { HttpOpts } from '../client/types';
import api from '../client/api';
import { getQuerystring } from '../utils';
import { CreditCard } from './payment';

export namespace Customer.Create {
	export type Payload = {
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

	export type Response = {
		id: string;
		ownId: string;
		fullname: string;
		createdAt: string;
		birthDate: string;
		email: string;
		fundingInstrument: {
			creditCard: {
				id: string;
				brand: string;
				first6: string;
				last4: string;
				store: true;
			};
			method: string;
		};
		phone: {
			countryCode: string;
			areaCode: string;
			number: string;
		};
		taxDocument: {
			type: string;
			number: string;
		};
		shippingAddress: {
			zipCode: string;
			street: string;
			streetNumber: string;
			city: string;
			district: string;
			state: string;
			country: string;
		};
		_links: {
			self: {
				href: string;
			};
			hostedAccount: {
				redirectHref: string;
			};
		};
		fundingInstruments: [
			{
				creditCard: {
					id: string;
					brand: string;
					first6: string;
					last4: string;
					store: true;
				};
				method: string;
			}
		];
	};
}

const getOne = (opts: HttpOpts, _id: string) =>
	api.get(opts, '/customers', _id);

const getAll = (opts: HttpOpts) => api.get(opts, '/customers');

const query = (opts: HttpOpts, _query: { filters: Record<string, any> }) =>
	api.get(opts, '/customers', null, null, getQuerystring(_query));

const create = (opts: HttpOpts, customer: Customer.Create.Payload) =>
	api.post(opts, '/customers', customer) as Customer.Create.Response;

const createCreditCard = (
	opts: HttpOpts,
	_id: string,
	creditCard: CreditCard
) => api.post(opts, `/customers/${_id}/fundinginstruments`, creditCard);

const removeCreditCard = (opts: HttpOpts, _id: string) =>
	api.remove(opts, `/fundinginstruments/${_id}`);

export default {
	getOne: getOne as unknown as OmitFirstArg<typeof getOne>,
	getAll: getAll as unknown as OmitFirstArg<typeof getAll>,
	create: create as unknown as OmitFirstArg<typeof create>,
	query: query as unknown as OmitFirstArg<typeof query>,
	createCreditCard: createCreditCard as unknown as OmitFirstArg<
		typeof createCreditCard
	>,
	removeCreditCard: removeCreditCard as unknown as OmitFirstArg<
		typeof removeCreditCard
	>,
};
