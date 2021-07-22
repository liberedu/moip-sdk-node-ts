import request from 'request-promise';
import { endpoints } from './endpoints';
import pjson from '../../package.json';
import { HttpConfig, HttpOpts } from './types';

const get = (
	opts: HttpOpts,
	endpoint: string | null,
	id?: string | null,
	config?: HttpConfig | null,
	qs?: string
) => {
	const path = id ? `/${id}` : qs ? `?${qs}` : '';
	const options = {
		url:
			config && config.customUrl
				? config.customUrl
				: `${endpoints[opts.env].v2.url}${endpoint}${path}`,
		headers: {
			Authorization: opts.auth,
			'User-Agent': `MoipNodeSDK/${pjson.version} (+https://github.com/moip/moip-sdk-node/)`,
		},
		method: 'GET',
		json: true,
		resolveWithFullResponse: true,
	};

	return request(options);
};

const post = (
	opts: HttpOpts,
	endpoint: string | null,
	payload?: any,
	config?: HttpConfig
) => {
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

	return request(options);
};

const put = (
	opts: HttpOpts,
	endpoint: string,
	payload: any,
	id: string,
	config?: HttpConfig
) => {
	const options = {
		url:
			config && config.customUrl
				? config.customUrl
				: `${endpoints[opts.env].v2.url}${endpoint}/${id || ''}`,
		headers: {
			Authorization: opts.auth,
			'User-Agent': `MoipNodeSDK/${pjson.version} (+https://github.com/moip/moip-sdk-node/)`,
		},
		method: 'PUT',
		body: payload,
		form: config && config.form,
		json: !config || !config.form,
		resolveWithFullResponse: true,
	};

	return request(options);
};

const remove = (opts: HttpOpts, endpoint: string) => {
	const options = {
		url: `${endpoints[opts.env].v2.url}${endpoint}`,
		headers: {
			Authorization: opts.auth,
			'User-Agent': `MoipNodeSDK/${pjson.version} (+https://github.com/moip/moip-sdk-node/)`,
		},
		method: 'DELETE',
		json: true,
		resolveWithFullResponse: true,
	};

	return request(options);
};

export default {
	get,
	post,
	remove,
	put,
};
