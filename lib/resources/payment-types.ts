export namespace Payment.Create {
	export type Payload = {
		installmentCount?: number;
		statementDescriptor?: string;
		delayCapture?: boolean;
		fundingInstrument: {
			method: 'CREDIT_CARD' | 'BOLETO' | 'ONLINE_BANK_DEBIT';
			creditCard?: CreditCard;
			boleto?: {
				expirationDate: string;
				instructionLines?: {
					first: string;
					second?: string;
					third?: string;
				};
				logoUri?: string;
			};
			onlineBankDebit?: {
				bankNumber: '341';
				expirationDate?: string;
				returnUri?: string;
			};
		};
	};

	export type Response = {
		id: string;
		status: string;
		delayCapture: boolean;
		amount: {
			total: number;
			gross: number;
			fees: number;
			refunds: number;
			liquid: number;
			currency: 'BRL';
		};
		installmentCount: number;
		statementDescriptor: string;
		fundingInstrument: {
			creditCard: {
				id: string;
				brand: string;
				first6: string;
				last4: string;
				store: boolean;
				holder: {
					birthdate: string;
					birthDate: string;
					taxDocument: {
						type: string;
						number: string;
					};
					billingAddress: {
						street: string;
						streetNumber: string;
						district: string;
						city: string;
						state: string;
						country: string;
						zipCode: string;
					};
					fullname: string;
				};
			};
			boleto: {
				lineCode: string;
				expirationDate: string;
				instructionLines: {
					first: string;
					second: string;
					third: string;
				};
				logoUri: string;
			};
			method: string;
		};
		fees: {
			type: string;
			amount: number;
		}[];
		events: {
			type: string;
			createdAt: string;
		}[];
		receivers: {
			moipAccount: {
				id: string;
				login: string;
				fullname: string;
			};
			type: string;
			amount: {
				total: number;
				refunds: number;
			};
		}[];
		device: {
			userAgent: string;
			ip: string;
			geolocation: {
				latitude: number;
				longitude: number;
			};
			fingerprint: string;
		};
		_links: {
			self: {
				href: string;
			};
			order: {
				href: string;
				title: string;
			};
			payBoleto: {
				printHref: string;
				redirectHref: string;
			};
		};
		createdAt: string;
		updatedAt: string;
	};
}

export namespace Payment.Capture {
	export type Response = Payment.Create.Response;
}

export namespace Payment.Cancel {
	export type Response = Payment.Create.Response;
}

export type CreditCard = {
	hash: string;
	holder: {
		fullname: string;
		birthdate?: string;
		taxDocument: {
			type: 'CPF' | 'CNPJ';
			number: string;
		};
		phone: {
			countryCode: string;
			areaCode: string;
			number: string;
		};
		billingAddress?: {
			city: string;
			district: string;
			street: string;
			streetNumber: string;
			zipCode: string;
			state: string;
			country: string;
		};
	};
};

export type Refund = {};
