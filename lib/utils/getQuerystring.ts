import qs from 'query-string';
import nqs from 'querystring';
import _ from 'lodash';

const formatField = (field: any, key: any) => `${key}(${field})`;

const formatFilter = (filter: any) => _.map(filter, formatField);

const stringify = (queryObj: Record<string, any>, sep = '|', eq = '::') =>
	nqs.unescape(qs.stringify(queryObj)).replace(/&/g, sep).replace(/=/g, eq);

const getFiltersQuerystring = (filters: any) =>
	_.mapValues(filters, (filter, key) =>
		stringify({ [key]: formatFilter(filter) })
	);

const formatQueryStringFilters = (filters: any) =>
	_.toArray(getFiltersQuerystring(filters)).join('&');

const getQuerystring = (_query: { filters: Record<string, any> }) =>
	_query &&
	stringify(
		Object.assign(
			_query,
			_query.filters && { filters: formatQueryStringFilters(_query.filters) }
		),
		'&',
		'='
	);

export default getQuerystring;
