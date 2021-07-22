import auth from './config/auth';
import connect from '../lib/client/index';
import chai from 'chai';
import orderModel from './schemas/order';
import { order } from './queries';
import shortid from 'shortid';

const { limit, offset, filters } = order;

const moip = connect(auth);

chai.should();
chai.use(require('chai-json-schema'));

describe('Moip Orders', () => {
	before((done) => {
		orderModel.ownId = shortid.generate();
		orderModel.customer.ownId = shortid.generate();
		done();
	});

	it('Should successfully create an order', (done) => {
		moip.order
			.create(orderModel)
			.then(({ body }: { body: any }) => {
				// Verify and add to schema
				body.should.have.property('id');
				body.should.have.property('status');
				body.should.have.property('createdAt');
				body.should.have.property('updatedAt');
				body.should.have.property('customer');
				body.should.have.property('_links');
				orderModel.id = body.id;
				orderModel.status = body.status;
				orderModel.createdAt = body.createdAt;
				orderModel.updatedAt = body.updatedAt;
				orderModel.customer = body.customer;
				orderModel._links = body._links;
				body.should.be.jsonSchema(orderModel);
				done();
			})
			.catch((err: any) => done(err));
	});

	it('Should successfully get an order', (done) => {
		moip.order
			.getOne(orderModel.id)
			.then(({ body }: { body: any }) => {
				body.should.be.jsonSchema(orderModel);
				done();
			})
			.catch((err: any) => done(err));
	});

	it('Should fail to get an order', (done) => {
		moip.order.getOne('invalid-id').catch(() => done());
	});

	it('Should successfully get a list of orders by empty query', (done) => {
		moip.order
			.query()
			.then(({ body }: { body: any }) => {
				body.should.have.property('orders');
				done();
			})
			.catch((err: any) => done(err));
	});

	it('Should successfully get a list of orders by query', (done) => {
		moip.order
			.query({ limit, offset, filters })
			.then(({ body }: { body: any }) => {
				body.should.have.property('orders');
				body.orders.length.should.be.equal(limit);
				body.orders
					.filter(
						(o: typeof orderModel) =>
							o.status !== 'PAID' && o.status !== 'WAITING'
					)
					.length.should.be.equal(0);
				done();
			})
			.catch((err: any) => done(err));
	});

	it('Should successfully get all orders', (done) => {
		moip.order
			.getAll()
			.then(() => {
				done();
			})
			.catch((err: any) => done(err));
	});
});
