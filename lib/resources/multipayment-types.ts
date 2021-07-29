export type MultiPayment = {
	installmentCount: number;
	fundingInstrument: {
		method: 'CREDIT_CARD' | 'BOLETO' | 'ONLINE_BANK_DEBIT' | 'WALLET';
		creditCard: {
			hash: string;
			holder: {
				fullname: string;
				birthdate: string;
				taxDocument: {
					type: 'CPF' | 'CNPJ';
					number: string;
				};
				phone: {
					countryCode: string;
					areaCode: string;
					number: string;
				};
			};
		};
	};
};
