import { HttpOpts } from '../client/types';
import api from '../client/api';

const release = (opts: HttpOpts, _id: string) =>
	api.post(opts, `/escrows/${_id}/release`, null);

export default {
	release: release as unknown as OmitFirstArg<typeof release>,
};
