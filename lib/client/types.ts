export type HttpConfig = {
	customUrl?: string;
	form?: { [key: string]: any } | string;
};

export type HttpOpts = {
	env: Environments;
	auth: string;
};

export type Environments = 'sandbox' | 'production';

export type ConnectRet<Ops> = {
	[K in keyof Ops]: Ops[K] extends Record<string, any>
		? { [K2 in keyof Ops[K]]: OmitFirstArg<Ops[K][K2]> }
		: Ops[K];
};
