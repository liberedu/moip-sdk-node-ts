export type Transfer = {
	ownId?: string;
	amount: number;
	description?: string;
	transferInstrument: {
		method: 'BANK_ACCOUNT' | 'MOIP_ACCOUNT';
		bankAccount?: BankAccount;
		moipAccount: {
			id: string;
		};
	};
};

type BankAccount = StoredBankAccount | NewBankAccount;

type StoredBankAccount = {
	id: string;
}

type NewBankAccount = {
	type: 'CHECKING' | 'SAVING';
	bankNumber: number;
	agencyNumber: number;
	agencyCheckNumber?: number;
	accountNumber: number;
	accountCheckNumber?: number;
	holder: {
		fullname: string;
		birthDate?: string;
		taxDocument: {
			type: 'CPF' | 'CNPJ';
			number: string;
		};
		phone?: {
			countryCode: string;
			areaCode: string;
			number: string;
		};
	};
}