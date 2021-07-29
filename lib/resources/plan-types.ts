export type Plan = {
	code: string;
	name: string;
	description: string;
	amount: number;
	setup_fee: number;
	max_qty: number;
	interval: {
		length: number;
		unit: 'DAY' | 'MONTH' | 'YEAR';
	};
	billing_cycles: number;
	trial: {
		days: number;
		enabled: boolean;
		hold_setup_fee: boolean;
	};
	payment_method: 'BOLETO' | 'CREDIT_CARD' | 'ALL';
};
