export type Account = {
	email: {
		address: string;
	};
	person: {
		name: string;
		lastName: string;
		taxDocument: {
			type: string;
			number: string;
		};
		identityDocument: {
			type: string;
			number: string;
			issuer: string;
			issueDate: string;
		};
		birthDate: string;
		phone: {
			countryCode: string;
			areaCode: string;
			number: string;
		};
		address: {
			street: string;
			streetNumber: string;
			district: string;
			zipCode: string;
			city: string;
			state: string;
			country: string;
		};
	};
	type: 'MERCHANT';
	transparentAccount: boolean;
};
