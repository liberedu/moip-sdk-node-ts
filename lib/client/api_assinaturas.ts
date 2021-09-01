import axios from 'axios';
import { endpoints } from './endpoints';
import pjson from '../../package.json';
import { HttpConfig, HttpOpts } from './types';

const get = async (
	opts: HttpOpts,
	endpoint: string,
	id?: string,
	config?: HttpConfig
) => {
	const response = await axios.request({
		baseURL:
			config && config.customUrl
				? config.customUrl
				: endpoints[opts.env].assinaturas.url,
		url: `${endpoint}/${id || ''}`,
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
	endpoint: string,
	payload?: any,
	config?: HttpConfig
) => {
	const response = await axios.request({
		baseURL:
			config && config.customUrl
				? config.customUrl
				: endpoints[opts.env].assinaturas.url,
		url: `${endpoint}`,
		headers: {
			Authorization: opts.auth,
			'User-Agent': `MoipNodeSDK/${pjson.version} (+https://github.com/moip/moip-sdk-node/)`,
		},
		method: 'POST',
		data: payload,
	});

	return response.data;
};

const put = async (
	opts: HttpOpts,
	endpoint: string,
	payload?: any,
	id?: string,
	config?: HttpConfig
) => {
	const response = await axios.request({
		baseURL:
			config && config.customUrl
				? config.customUrl
				: endpoints[opts.env].assinaturas.url,
		url: `${endpoint}/${id || ''}`,
		headers: {
			Authorization: opts.auth,
			'User-Agent': `MoipNodeSDK/${pjson.version} (+https://github.com/moip/moip-sdk-node/)`,
		},
		method: 'PUT',
		data: payload,
	});

	return response.data;
};

const remove = async (opts: HttpOpts, endpoint: string) => {
	const response = await axios.request({
		baseURL: endpoints[opts.env].assinaturas.url,
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
