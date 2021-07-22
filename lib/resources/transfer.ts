import { HttpOpts } from '../client/types';
import api from '../client/api';

export type Transfer = {
	ownId?: string;
	amount: number;
	description?: string;
	transferInstrument: {
		method: 'BANK_ACCOUNT' | 'MOIP_ACCOUNT';
		bankAccount?: {
			type: 'CHECKING' | 'SAVING';
			bankNumber: number;
			agencyNumber: number;
			agencyCheckNumber?: number;
			accountNumber: number;
			accountCheckNumber?: number;
			holder: {
				fullname: string;
				birthDate?: string;
				taxDocument: {
					type: 'CPF' | 'CNPJ';
					number: string;
				};
				phone?: {
					countryCode: string;
					areaCode: string;
					number: string;
				};
			};
		};
		moipAccount: {
			id: string;
		};
	};
};

const getOne = (opts: HttpOpts, _id: string) =>
	api.get(opts, '/transfers', _id);

const getAll = (opts: HttpOpts) => api.get(opts, '/transfers');

const reverse = (opts: HttpOpts, _id: string) =>
	api.post(opts, `/transfers/${_id}/reverse`);

const create = (opts: HttpOpts, transfer: Transfer) =>
	api.post(opts, '/transfers', transfer);

export default {
	getOne,
	getAll,
	reverse,
	create,
};
