import { HttpOpts } from '../client/types';
import api from '../client/api';

export type NotificationPreferences = {
	events: string;
	target: string;
	media: 'WEBHOOK';
};

const getOne = (opts: HttpOpts, _id: string) =>
	api.get(opts, '/preferences/notifications', _id);

const getAll = (opts: HttpOpts) => api.get(opts, '/preferences/notifications');

const create = (opts: HttpOpts, preferences: NotificationPreferences) =>
	api.post(opts, '/preferences/notifications', preferences);

const remove = (opts: HttpOpts, _id: string) =>
	api.remove(opts, `/preferences/notifications/${_id}`);

export default {
	getOne,
	getAll,
	create,
	remove,
};
