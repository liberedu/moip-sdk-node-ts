import axios from 'axios';
import { endpoints } from './endpoints';
import pjson from '../../package.json';
import { HttpConfig, HttpOpts } from './types';

const get = async (
	opts: HttpOpts,
	endpoint: string | null,
	id?: string | null,
	config?: HttpConfig | null,
	qs?: string
): Promise<any> => {
	const path = id ? `/${id}` : qs ? `?${qs}` : '';

	const response = await axios.request({
		baseURL:
			config && config.customUrl
				? config.customUrl
				: endpoints[opts.env].v2.url,
		url: `${endpoint}${path}`,
		headers: {
			Authorization: opts.auth,
			'User-Agent': `MoipNodeSDK/${pjson.version} (+https://github.com/moip/moip-sdk-node/)`,
		},
		method: 'GET',
	});

	return response.data;
};

const post = async (
	opts: HttpOpts,
	endpoint: string | null,
	payload?: any,
	config?: HttpConfig
): Promise<any> => {
	const options = {
		url:
			config && config.customUrl
				? config.customUrl
				: `${endpoints[opts.env].v2.url}${endpoint}`,
		headers: {
			Authorization: opts.auth,
			'User-Agent': `MoipNodeSDK/${pjson.version} (+https://github.com/moip/moip-sdk-node/)`,
		},
		method: 'POST',
		body: payload || null,
		form: config && config.form && payload,
		json: !config || !config.form,
		resolveWithFullResponse: true,
	};

	const response = await axios.request({
		baseURL:
			config && config.customUrl
				? config.customUrl
				: endpoints[opts.env].v2.url,
		url: `${endpoint}`,
		headers: {
			Authorization: opts.auth,
			'User-Agent': `MoipNodeSDK/${pjson.version} (+https://github.com/moip/moip-sdk-node/)`,
		},
		method: 'POST',
		data: payload || null,
	});

	return response.data;
};

const put = async (
	opts: HttpOpts,
	endpoint: string,
	payload: any,
	id: string,
	config?: HttpConfig
): Promise<any> => {
	const response = await axios.request({
		baseURL:
			config && config.customUrl
				? config.customUrl
				: endpoints[opts.env].v2.url,
		url: `${endpoint}/${id || ''}`,
		headers: {
			Authorization: opts.auth,
			'User-Agent': `MoipNodeSDK/${pjson.version} (+https://github.com/moip/moip-sdk-node/)`,
		},
		method: 'PUT',
		data: payload || null,
	});

	return response.data;
};

const remove = async (opts: HttpOpts, endpoint: string): Promise<any> => {
	const response = await axios.request({
		baseURL: `${endpoints[opts.env].v2.url}`,
		url: `${endpoint}`,
		headers: {
			Authorization: opts.auth,
			'User-Agent': `MoipNodeSDK/${pjson.version} (+https://github.com/moip/moip-sdk-node/)`,
		},
		method: 'DELETE',
	});

	return response.data;
};

export default {
	get,
	post,
	remove,
	put,
};
