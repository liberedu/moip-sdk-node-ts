import auth from './config/auth';
import connect from '../lib/client/index';
import multiorderModel from './schemas/multiorder';
import multipaymentModel from './schemas/payment';
import shortid from 'shortid';
import chai from 'chai';

const moip = connect(auth);

chai.should();
chai.use(require('chai-json-schema'));

let preAuthorizedMultiPayment: boolean;

describe('Moip Multipayments', () => {
	before((done) => {
		multiorderModel.ownId = shortid.generate();
		multiorderModel.orders[0].ownId = shortid.generate();
		multiorderModel.orders[1].ownId = shortid.generate();
		multiorderModel.orders[0].customer.ownId = shortid.generate();
		multiorderModel.orders[1].customer.ownId = shortid.generate();
		done();
	});

	let multiorderId: string;

	it('Should successfully create a multiorder', (done) => {
		moip.multiorder
			.create(multiorderModel)
			.then(({ body }: { body: any }) => {
				body.should.have.property('id');
				multiorderId = body.id;
				done();
			})
			.catch(done);
	});

	it('Should successfully create a multipayment for a multiorder', (done) => {
		moip.multipayment
			.create(multiorderId, multipaymentModel)
			.then(({ body }: { body: any }) => {
				body.should.have.property('id');
				multipaymentModel.id = body.id;
				done();
			})
			.catch(done);
	});

	it('Should successfully get a multipayment', (done) => {
		moip.multipayment
			.getOne(multipaymentModel.id)
			.then(({ body }: { body: any }) => {
				body.should.have.property('id');
				done();
			})
			.catch(done);
	});

	it('Should fail to get a multipayment', (done) => {
		moip.multipayment.getOne('invalid-id').catch(() => done());
	});
});

describe('Moip Multipayment Pre-Authorization Capture', () => {
	/*
   Create delay between requests
  */
	beforeEach((done) => {
		setTimeout(done, 4000);
	});

	before((done) => {
		multiorderModel.ownId = shortid.generate();
		multiorderModel.orders[0].ownId = shortid.generate();
		multiorderModel.orders[1].ownId = shortid.generate();
		multiorderModel.orders[0].customer.ownId = shortid.generate();
		multiorderModel.orders[1].customer.ownId = shortid.generate();
		done();
	});

	let multiorderId: string;

	it('Should successfully create a multiorder', (done) => {
		moip.multiorder
			.create(multiorderModel)
			.then(({ body }: { body: any }) => {
				body.should.have.property('id');
				multiorderId = body.id;
				done();
			})
			.catch(done);
	});

	it('Should create multipayment with pre authorization', (done) => {
		multipaymentModel.delayCapture = true;
		moip.multipayment
			.create(multiorderId, multipaymentModel)
			.then(({ body }: { body: any }) => {
				body.should.have.property('id');
				multipaymentModel.id = body.id;
				done();
			})
			.catch(done);
	});

	it('Should capture multipayment pre authorized', (done) => {
		moip.multipayment
			.preAuthorizationCapture(multipaymentModel.id)
			.then(({ body }: { body: any }) => {
				body.status.should.be.eql('AUTHORIZED');
				done();
			})
			.catch(done);
	});
});

describe('Moip Multipayment Pre-Authorization Cancel', () => {
	/*
       Create delay between requests
   */
	beforeEach((done) => {
		setTimeout(done, 4000);
	});

	before((done) => {
		multiorderModel.ownId = shortid.generate();
		multiorderModel.orders[0].ownId = shortid.generate();
		multiorderModel.orders[1].ownId = shortid.generate();
		multiorderModel.orders[0].customer.ownId = shortid.generate();
		multiorderModel.orders[1].customer.ownId = shortid.generate();
		done();
	});

	let multiorderId: string;

	it('Should successfully create a multiorder', (done) => {
		moip.multiorder
			.create(multiorderModel)
			.then(({ body }: { body: any }) => {
				body.should.have.property('id');
				multiorderId = body.id;
				done();
			})
			.catch(done);
	});

	it('Should create multipayment with pre authorization', (done) => {
		multipaymentModel.delayCapture = true;
		moip.multipayment
			.create(multiorderId, multipaymentModel)
			.then(({ body }: { body: any }) => {
				body.should.have.property('id');
				multipaymentModel.id = body.id;
				preAuthorizedMultiPayment = body.id;
				done();
			})
			.catch(done);
	});

	it('Should cancel multipayment pre authorized', (done) => {
		moip.multipayment
			.preAuthorizationCancel(preAuthorizedMultiPayment)
			.then(({ body }: { body: any }) => {
				body.status.should.be.eql('CANCELLED');
				done();
			})
			.catch(done);
	});
});
