import { HttpOpts } from '../client/types';
import api from '../client/api';
import * as types from './bank-account-types';

const create = (opts: HttpOpts, _id: string, bankAccount: types.BankAccount) =>
	api.post(opts, `/accounts/${_id}/bankaccounts`, bankAccount);

const getOne = (opts: HttpOpts, _id: string) =>
	api.get(opts, '/bankaccounts', _id);

const getAll = (opts: HttpOpts, _id: string) =>
	api.get(opts, `/accounts/${_id}/bankaccounts`);

const remove = (opts: HttpOpts, _id: string) =>
	api.remove(opts, `/bankaccounts/${_id}`);

export default {
	create: create as unknown as OmitFirstArg<typeof create>,
	getOne: getOne as unknown as OmitFirstArg<typeof getOne>,
	getAll: getAll as unknown as OmitFirstArg<typeof getAll>,
	remove: remove as unknown as OmitFirstArg<typeof remove>,
};
