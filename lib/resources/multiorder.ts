import { HttpOpts } from '../client/types';
import api from '../client/api';

export type MultiOrder = {
	ownId: string;
	orders: Array<{
		ownId: string;
		amount: {
			currency: 'BRL';
			subtotals: {
				shipping: number;
			};
		};
		items: [
			{
				product: string;
				quantity: number;
				detail: string;
				price: number;
			}
		];
		customer: {
			fullname: string;
			email: string;
			birthDate: string;
			taxDocument: {
				type: 'CPF' | 'CNPJ';
				number: string;
			};
			phone: {
				countryCode: string;
				areaCode: string;
				number: string;
			};
			shippingAddress: {
				street: string;
				streetNumber: number;
				complement: number;
				district: string;
				city: string;
				state: string;
				country: string;
				zipCode: string;
			};
		};
		receivers: [
			{
				type: 'PRIMARY' | 'SECONDARY';
				moipAccount: {
					id: string;
				};
			}
		];
	}>;
};

const getOne = (opts: HttpOpts, _id: string) =>
	api.get(opts, '/multiorders', _id);

const create = (opts: HttpOpts, multiorder: MultiOrder) =>
	api.post(opts, '/multiorders', multiorder);

export default {
	getOne,
	create,
};
