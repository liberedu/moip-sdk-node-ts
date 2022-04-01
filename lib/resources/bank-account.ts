import { HttpOpts } from '../client/types';
import api from '../client/api';
import * as types from './bank-account-types';

const create = (opts: HttpOpts, _id: string, bankAccount: types.BankAccount, accessToken?: string) =>
	api.post({ ...opts, auth: `OAuth ${accessToken}` }, `/accounts/${_id}/bankaccounts`, bankAccount);

const getOne = (opts: HttpOpts, _id: string, accessToken?: string) =>
	api.get({ ...opts, auth: `OAuth ${accessToken}` }, '/bankaccounts', _id);

const getAll = (opts: HttpOpts, _id: string, accessToken?: string) =>
	api.get({ ...opts, auth: `OAuth ${accessToken}` }, `/accounts/${_id}/bankaccounts`);

const remove = (opts: HttpOpts, _id: string, accessToken?: string) =>
	api.remove({ ...opts, auth: `OAuth ${accessToken}` }, `/bankaccounts/${_id}`);

export default {
	create: create as unknown as OmitFirstArg<typeof create>,
	getOne: getOne as unknown as OmitFirstArg<typeof getOne>,
	getAll: getAll as unknown as OmitFirstArg<typeof getAll>,
	remove: remove as unknown as OmitFirstArg<typeof remove>,
};
