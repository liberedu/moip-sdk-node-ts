import chai from 'chai';
import auth from './config/auth';
import connect from '../lib/client/index';
import orderModel from './schemas/order';
import paymentWithEscrowModel from './schemas/paymentWithEscrow';
import shortid from 'shortid';

const moip = connect(auth);

chai.should();
chai.use(require('chai-json-schema'));

let order: typeof orderModel;

describe('Moip Escrow', () => {
	/*
       Create delay between requests
   */
	beforeEach((done) => {
		setTimeout(done, 500);
	});

	before((done) => {
		orderModel.ownId = shortid.generate();
		orderModel.customer.ownId = shortid.generate();
		done();
	});

	let orderId: string;
	let escrowId: string;

	it('Should successfully create an order', (done) => {
		moip.order
			.create(orderModel)
			.then(({ body }: { body: any }) => {
				orderId = body.id;
				done();
			})
			.catch(done);
	});

	it('Should create payment with escrow', (done) => {
		moip.payment
			.create(orderId, paymentWithEscrowModel)
			.then(({ body }: { body: any }) => {
				body.should.have.property('id');
				body.should.have.property('escrows');
				chai.expect(body.escrows).to.be.an('array').that.is.not.empty;
				escrowId = body.escrows[0].id;
				done();
			})
			.catch(done);
	});

	it('Should release escrow', (done) => {
		moip.escrow
			.release(escrowId)
			.then(({ body }: { body: any }) => {
				body.should.have.property('id');
				body.status.should.be.eql('RELEASED');
				done();
			})
			.catch(done);
	});
});
