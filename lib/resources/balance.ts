import { HttpOpts } from '../client/types';
import api from '../client/api_balance';
import { BalanceType } from './balance-types';

const getOne = (opts: HttpOpts, accessToken?: string) => api.get<BalanceType>(opts, '/balances', accessToken);

export default {
	getOne: getOne as unknown as OmitFirstArg<typeof getOne>,
};
