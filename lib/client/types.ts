export type HttpConfig = {
	customUrl?: string;
	form?: { [key: string]: any } | string;
};

export type HttpOpts = {
	env: Environments;
	auth: string;
};

export type Environments = 'sandbox' | 'production';

export type ConnectRet<Opt> = {
	[K in keyof Opt]: Opt[K] extends (...args: any) => any
		? OmitFirstArg<Opt[K]>
		: Opt[K] extends Record<string, any>
		? ConnectRet<Opt[K]>
		: Opt[K];
};
