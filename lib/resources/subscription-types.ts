export type Subscription = {
	plan: {
		code: string;
	};
	amount: string;
	next_invoice_date: {
		day: string;
		month: string;
		year: string;
	};
};
