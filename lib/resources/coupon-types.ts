export type Coupon = {
	code: string;
	name: string;
	description: string;
	discount: {
		value: number;
		type: 'percent' | 'amount';
	};
	status: 'active' | 'inactive';
	duration: {
		type: 'once' | 'repeating' | 'forever';
		occurrences: 12;
	};
	max_redemptions: number;
	expiration_date: {
		year: number;
		month: number;
		day: number;
	};
};
