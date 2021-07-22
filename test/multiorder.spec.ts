import chai from 'chai';
import multiorderModel from './schemas/multiorder';
import shortid from 'shortid';
import auth from './config/auth';
import connect from '../lib/client/index';

const moip = connect(auth);

chai.should();
chai.use(require('chai-json-schema'));

describe('Moip Multiorders', () => {
	before((done) => {
		multiorderModel.ownId = shortid.generate();
		multiorderModel.orders[0].ownId = shortid.generate();
		multiorderModel.orders[1].ownId = shortid.generate();
		multiorderModel.orders[0].customer.ownId = shortid.generate();
		multiorderModel.orders[1].customer.ownId = shortid.generate();
		done();
	});

	it('Should successfully create a multiorder', (done) => {
		moip.multiorder
			.create(multiorderModel)
			.then(({ body }: { body: any }) => {
				// Verify and add to schema
				body.should.have.property('id');
				multiorderModel.id = body.id;
				done();
			})
			.catch((err: any) => done(err));
	});

	it('Should successfully get a multiorder', (done) => {
		moip.multiorder
			.getOne(multiorderModel.id)
			.then(({ body }: { body: any }) => {
				body.should.have.property('id');
				done();
			})
			.catch((err: any) => done(err));
	});

	it('Should fail to get a multiorder', (done) => {
		moip.multiorder.getOne('invalid-id').catch(() => done());
	});
});
