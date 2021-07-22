import { Buffer } from 'safe-buffer';
import resources from './resources';
import { bind, reduce, isFunction } from 'lodash';

export interface AuthorizationOpts {
	accessToken?: string;
	token?: string;
	key?: string;
}

export interface ConnectOpts extends AuthorizationOpts {
	production: boolean;
}

const environment = (isProduction: boolean) => {
	return isProduction ? 'production' : 'sandbox';
};

const authorization = (opts: AuthorizationOpts) => {
	let auth;
	if (opts.accessToken) {
		auth = 'OAuth ' + opts.accessToken;
	} else if (opts.token && opts.key) {
		auth =
			'Basic ' + new Buffer(opts.token + ':' + opts.key).toString('base64');
	} else {
		throw Error(
			'You must provide either an `accessToken` or your `token` with the corresponding `key`.'
		);
	}

	return auth;
};

const binder = (func: any, args: any) => bind(func, null, args);

const looper = (result: any, resource: any, authObject: any) =>
	reduce(
		resource,
		(result: any, func: any, key: any) => {
			result[key] = isFunction(func)
				? binder(func, authObject)
				: looper(result, func, authObject);
			return result;
		},
		{}
	);

const connect = (opts: ConnectOpts) => {
	const auth = authorization(opts);
	const env = environment(opts.production);

	return reduce(
		resources,
		(result: any, resource: any, key: any) => {
			result[key] = looper(result, resource, { auth, env });
			return result;
		},
		{}
	);
};

export default connect;
