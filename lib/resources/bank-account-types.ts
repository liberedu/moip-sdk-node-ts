export type BankAccount = {
	bankNumber: string;
	agencyNumber: string;
	agencyCheckNumber: string;
	accountNumber: string;
	accountCheckNumber: string;
	type: 'CHECKING' | 'SAVING';
	holder: {
		taxDocument: {
			type: 'CPF' | 'CNPJ';
			number: string;
		};
		fullname: string;
	};
};
