import { HttpOpts } from '../client/types';
import api from '../client/api';

const getOne = (opts: HttpOpts, accessToken?: string) => api.get({ ...opts, auth: `OAuth ${accessToken}` }, '/balances');

export default {
	getOne: getOne as unknown as OmitFirstArg<typeof getOne>,
};
