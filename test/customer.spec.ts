import chai from 'chai';
import customerModel from './schemas/customer';
import creditCardModel from './schemas/creditCard';
import shortid from 'shortid';
import auth from './config/auth';
import connect from '../lib/client/index';
import { customer } from './queries';

const { limit, offset, filters } = customer;

const moip = connect(auth);

chai.should();
chai.use(require('chai-json-schema'));

let creditCardID: string;

describe('Moip Customers', () => {
	before((done) => {
		customerModel.ownId = shortid.generate();
		done();
	});

	it('Successfully create a customer', (done) => {
		moip.customer
			.create(customerModel)
			.then(({ body }: { body: any }) => {
				body.should.have.property('id');
				customerModel.id = body.id;
				body.should.be.jsonSchema(customerModel);
				done();
			})
			.catch((err: any) => {
				done(err.statusCode);
			});
	});

	it('Successfully get a customer', (done) => {
		moip.customer.getOne(customerModel.id).then(({ body }: { body: any }) => {
			body.should.be.jsonSchema(customerModel);
			done();
		});
	});

	it('Fail to get a customer with non-existent id', (done) => {
		moip.customer.getOne('non-existent-id').catch(() => done());
	});

	it('Successfully add a credit card to a customer', (done) => {
		moip.customer
			.createCreditCard(customerModel.ownId, creditCardModel)
			.then(({ body }: { body: any }) => {
				body.should.have.property('creditCard');
				creditCardID = body.creditCard.id;
				done();
			})
			.catch(done);
	});

	it('Should successfully get a list of customers by empty query', (done) => {
		moip.customer
			.query()
			.then(({ body }: { body: any }) => {
				body.should.have.property('customers');
				done();
			})
			.catch((err: any) => done(err));
	});

	it('Should successfully get a list of customers by query', (done) => {
		moip.customer
			.query({ limit, offset, filters })
			.then(({ body }: { body: any }) => {
				body.should.have.property('customers');
				body.customers.length.should.be.equal(limit);
				done();
			})
			.catch((err: any) => done(err));
	});

	it('Successfully remove a credit card from a customer', (done) => {
		moip.customer
			.removeCreditCard(creditCardID)
			.then(() => {
				done();
			})
			.catch(done);
	});
});
