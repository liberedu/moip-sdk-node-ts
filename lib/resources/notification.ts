import { HttpOpts } from '../client/types';
import api from '../client/api';
import * as types from './notification-types';

const getOne = (opts: HttpOpts, _id: string) =>
	api.get(opts, '/preferences/notifications', _id);

const getAll = (opts: HttpOpts) => api.get(opts, '/preferences/notifications');

const create = (opts: HttpOpts, preferences: types.NotificationPreferences, appId?: string) =>  {
	const route = appId ? `/preferences/${appId}/notifications` : '/preferences/notifications';
	return api.post(opts, route, preferences);
}

const remove = (opts: HttpOpts, _id: string) =>
	api.remove(opts, `/preferences/notifications/${_id}`);

export default {
	getOne: getOne as unknown as OmitFirstArg<typeof getOne>,
	getAll: getAll as unknown as OmitFirstArg<typeof getAll>,
	create: create as unknown as OmitFirstArg<typeof create>,
	remove: remove as unknown as OmitFirstArg<typeof remove>,
};
