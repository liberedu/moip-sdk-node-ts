import { HttpOpts } from '../client/types';
import api from '../client/api';

export type MultiPayment = {
	installmentCount: number;
	fundingInstrument: {
		method: 'CREDIT_CARD' | 'BOLETO' | 'ONLINE_BANK_DEBIT' | 'WALLET';
		creditCard: {
			hash: string;
			holder: {
				fullname: string;
				birthdate: string;
				taxDocument: {
					type: 'CPF' | 'CNPJ';
					number: string;
				};
				phone: {
					countryCode: string;
					areaCode: string;
					number: string;
				};
			};
		};
	};
};

const getOne = (opts: HttpOpts, _id: string) =>
	api.get(opts, '/multipayments', _id);

const create = (
	opts: HttpOpts,
	multiorderId: string,
	multipayment: MultiPayment
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
