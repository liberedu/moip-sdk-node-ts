export default {
	events: ['ORDER.*', 'PAYMENT.AUTHORIZED', 'PAYMENT.CANCELLED'],
	target: 'https://requestb.in/17ndz451',
	media: 'WEBHOOK',
} as any;
