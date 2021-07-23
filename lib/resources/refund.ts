import { HttpOpts } from '../client/types';
import api from '../client/api';

const get = (opts: HttpOpts, _id: string) => api.get(opts, '/refunds', _id);

export default {
	get: get as unknown as OmitFirstArg<typeof get>,
};
