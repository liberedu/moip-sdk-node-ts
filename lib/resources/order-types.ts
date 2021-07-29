import { Customer } from './customer';

export namespace Order.Create {
	export type Payload = {
		ownId: string;
		amount: {
			currency: 'BRL';
			subtotals?: {
				shipping?: number;
				addition?: number;
				discount?: number;
			};
		};
		items: Array<{
			product: string;
			category?: string;
			quantity: number;
			detail?: string;
			price: number;
		}>;
		customer: Customer.Create.Payload & { id?: string };
		receivers?: {
			type: 'PRIMARY' | 'SECONDARY';
			feePayor: boolean;
			moipAccount: {
				id: string;
			};
			amount: {
				fixed?: number;
				percentual?: number;
			};
		}[];
	};

	export type Response = {
		id: string;
		ownId: string;
		status: string;
		platform: string;
		createdAt: string;
		updatedAt: string;
		amount: {
			paid: number;
			total: number;
			fees: number;
			refunds: number;
			liquid: number;
			otherReceivers: number;
			currency: 'BRL';
			subtotals: {
				shipping: number;
				addition: number;
				discount: number;
				items: number;
			};
		};
		items: {
			price: number;
			detail: string;
			quantity: number;
			product: string;
			category: string;
		}[];
		addresses: {
			streetNumber: string;
			street: string;
			city: string;
			complement: string;
			district: string;
			zipCode: string;
			state: string;
			type: string;
			country: string;
		}[];
		customer: Customer.Create.Response;
		payments: [];
		escrows: [];
		refunds: [];
		entries: [];
		events: {
			type: string;
			createdAt: string;
			description: string;
		}[];
		receivers: {
			moipAccount: {
				id: string;
				login: string;
				fullname: string;
			};
			type: 'PRIMARY' | 'SECONDARY';
			amount: {
				total: number;
				fees: number;
				refunds: number;
			};
			feePayor: boolean;
		}[];
		_links: {
			self: {
				href: string;
			};
			checkout: {
				payCheckout: {
					redirectHref: string;
				};
				payCreditCard: {
					redirectHref: string;
				};
				payBoleto: {
					redirectHref: string;
				};
				payOnlineBankDebitItau: {
					redirectHref: string;
				};
			};
		};
	};
}
