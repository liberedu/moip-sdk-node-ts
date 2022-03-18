import axios from 'axios';
import { endpoints } from './endpoints';
import { HttpOpts, HttpConfig } from './types';
import pjson from '../../package.json';
import { AxiosResponse } from 'axios';

const get = async <T = any, R = AxiosResponse<T>>(opts: HttpOpts, endpoint: string | null, accessToken?: string, config?: HttpConfig | null): Promise<R> => {
  const response = await axios.request({
		baseURL:
			config && config.customUrl
				? config.customUrl
				: endpoints[opts.env].v2.url,
		url: `${endpoint}`,
		headers: {
			Authorization: accessToken ? `OAuth  ${accessToken}` : opts.auth,
      Accept: `application/json;version=2.1`,
			'User-Agent': `MoipNodeSDK/${pjson.version} (+https://github.com/moip/moip-sdk-node/)`,
		},
		method: 'GET',
	});
  
  return response.data;
}

export default { get };