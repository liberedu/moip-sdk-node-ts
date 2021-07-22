import { HttpOpts } from 'lib/client/types';
import api from '../client/api';

const getOne = (opts: HttpOpts) => api.get(opts, '/balances');

export default {
	getOne,
};
