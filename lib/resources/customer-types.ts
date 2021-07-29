export namespace Customer.Create {
	export type Payload = {
		ownId: string;
		fullname: string;
		email: string;
		birthDate: string | null;
		taxDocument: {
			type: string;
			number: string;
		};
		phone: {
			countryCode: string;
			areaCode: string;
			number: string;
		};
		shippingAddress: {
			city: string;
			complement?: string;
			district: string;
			street: string;
			streetNumber: string;
			zipCode: string;
			state: string;
			country: string;
		};
	};

	export type Response = {
		id: string;
		ownId: string;
		fullname: string;
		createdAt: string;
		birthDate: string;
		email: string;
		fundingInstrument: {
			creditCard: {
				id: string;
				brand: string;
				first6: string;
				last4: string;
				store: true;
			};
			method: string;
		};
		phone: {
			countryCode: string;
			areaCode: string;
			number: string;
		};
		taxDocument: {
			type: string;
			number: string;
		};
		shippingAddress: {
			zipCode: string;
			street: string;
			streetNumber: string;
			city: string;
			district: string;
			state: string;
			country: string;
		};
		_links: {
			self: {
				href: string;
			};
			hostedAccount: {
				redirectHref: string;
			};
		};
		fundingInstruments: [
			{
				creditCard: {
					id: string;
					brand: string;
					first6: string;
					last4: string;
					store: true;
				};
				method: string;
			}
		];
	};
}
