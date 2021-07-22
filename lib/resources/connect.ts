import api from '../client/api';
import { endpoints } from '../client/endpoints';
import Promise from 'bluebird';
import snakeCaseKeys from 'snakecase-keys';
import { HttpConfig, HttpOpts } from '../client/types';

const getAuthorizeUrl = (
	opts: HttpOpts,
	payload: { clientId: string; redirectUri: string; scopes: string }
) => {
	const { clientId, redirectUri, scopes } = payload;

	return new Promise((resolve, reject) => {
		if (clientId && redirectUri && scopes) {
			const responseType = 'response_type=code';
			return resolve(
				`${
					endpoints[opts.env].v2.authorizeUrl
				}?${responseType}&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes}`
			);
		} else {
			return reject(
				new Error(
					'Please inform the config object passing your client_id, redirect_uri and the list of scopes'
				)
			);
		}
	});
};

const generateToken = (opts: HttpOpts, config: HttpConfig) =>
	api.post(opts, null, snakeCaseKeys(config), {
		customUrl: endpoints[opts.env].v2.generateTokenUrl,
		form: {},
	});

export default {
	getAuthorizeUrl,
	generateToken,
};
