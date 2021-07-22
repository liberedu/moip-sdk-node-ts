import auth from './config/auth';
import connect from '../lib/client/index';
import chai from 'chai';
import shortid from 'shortid';
import subscriber from './schemas/subscriber';
import subscription from './schemas/subscription';
import plan from './schemas/plan';

const moip = connect(auth);

chai.should();
chai.use(require('chai-json-schema'));

describe('Moip Subscriptions', () => {
	before((done) => {
		/* Generate new codes */
		subscription.code = shortid.generate();
		plan.code = shortid.generate();
		subscription.plan.code = plan.code;
		subscription.customer.code = subscriber.code;
		done();
	});

	it('Should successfully create a new plan', (done) => {
		moip.plan
			.create(plan)
			.then((response: any) => {
				response.statusCode.should.be.eql(201);
				done();
			})
			.catch(done);
	});

	it('Should successfully create a subscription', (done) => {
		moip.subscription
			.create(subscription, { new_customer: false })
			.then((response: any) => {
				response.statusCode.should.be.eql(201);
				done();
			})
			.catch((err: any) => {
				done(err);
			});
	});

	it('Should successfully get a subscription', (done) => {
		moip.subscription
			.getOne(subscription.code)
			.then((response: any) => {
				response.statusCode.should.be.eql(200);
				done();
			})
			.catch(done);
	});

	it('Should successfully create a new plan for subscription update', (done) => {
		plan.code = shortid.generate();
		moip.plan
			.create(plan)
			.then((response: any) => {
				response.statusCode.should.be.eql(201);
				done();
			})
			.catch(done);
	});

	it('Should successfully update a subscription', (done) => {
		const invoiceDate = new Date();
		invoiceDate.setDate(invoiceDate.getDate() + 3);
		moip.subscription
			.update(subscription.code, {
				plan: {
					code: plan.code,
				},
				amount: '9990',
				next_invoice_date: {
					day: invoiceDate.getDate(),
					month: invoiceDate.getMonth() + 1,
					year: invoiceDate.getFullYear(),
				},
			})
			.then((response: any) => {
				response.statusCode.should.be.eql(200);
				done();
			})
			.catch(done);
	});

	it('Should successfully get all subscriptions', (done) => {
		moip.subscription
			.getAll()
			.then((response: any) => {
				response.statusCode.should.be.eql(200);
				done();
			})
			.catch(done);
	});

	it('Should successfully update a subscription billing method', (done) => {
		moip.subscription
			.update(subscription.code, {
				payment_method: 'BOLETO',
			})
			.then((response: any) => {
				response.statusCode.should.be.eql(200);
				done();
			})
			.catch(done);
	});

	it('Should successfully suspend a subscription', (done) => {
		moip.subscription
			.suspend(subscription.code)
			.then((response: any) => {
				response.statusCode.should.be.eql(200);
				done();
			})
			.catch(done);
	});

	it('Should successfully reactivate a subscription', (done) => {
		moip.subscription
			.activate(subscription.code)
			.then((response: any) => {
				response.statusCode.should.be.eql(200);
				done();
			})
			.catch(done);
	});

	it('Should successfully cancel a subscription', (done) => {
		moip.subscription
			.cancel(subscription.code)
			.then((response: any) => {
				response.statusCode.should.be.eql(200);
				done();
			})
			.catch(done);
	});

	it('Should successfully get all invoices from a subscription', (done) => {
		moip.subscription
			.getAllInvoices(subscription.code)
			.then((response: any) => {
				response.statusCode.should.be.eql(200);
				/* Set an invoiceId for testing */
				subscription.invoiceId = response.body.invoices[0].id;
				done();
			})
			.catch(done);
	});

	it('Should successfully get one invoice from a subscription', (done) => {
		moip.subscription
			.getOneInvoice(subscription.invoiceId)
			.then((response: any) => {
				response.statusCode.should.be.eql(200);
				done();
			})
			.catch(done);
	});

	it('Should successfully get all payments from an invoice', (done) => {
		moip.subscription
			.getAllPayments(subscription.invoiceId)
			.then((response: any) => {
				response.statusCode.should.be.eql(200);
				done();
			})
			.catch(done);
	});

	it('Should successfully create a notification preference for subscriptions', (done) => {
		moip.subscription
			.createNotification({
				notification: {
					webhook: {
						url: 'http://exemploldeurl.com.br/assinaturas',
					},
					email: {
						merchant: {
							enabled: true,
						},
						customer: {
							enabled: true,
						},
					},
				},
			})
			.then((response: any) => {
				response.statusCode.should.be.eql(200);
				done();
			})
			.catch(done);
	});
});
