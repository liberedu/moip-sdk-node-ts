export type HttpConfig = {
	customUrl?: string;
	form?: { [key: string]: any } | string;
};

export type HttpOpts = {
	env: Environments;
	auth: string;
};

export type Environments = 'sandbox' | 'production';
