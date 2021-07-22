import auth from './config/auth';
import connect from '../lib/client/index';
import chai from 'chai';
import transferModel from './schemas/transfer';

const moip = connect(auth);

chai.should();
chai.use(require('chai-json-schema'));

const moipAccount = 'MPA-CULBBYHD11';
let transferID: string;

describe('Transfer', () => {
	it('Should successfully transfer to bank account', (done) => {
		moip.transfer
			.create(transferModel)
			.then(({ body }: { body: any }) => {
				body.should.have.property('id');
				transferID = body.id;
				done();
			})
			.catch(done);
	});

	it('Should successfully get one transfer', (done) => {
		moip.transfer
			.getOne(transferID)
			.then(({ body }: { body: any }) => {
				body.should.have.property('id');
				done();
			})
			.catch(done);
	});

	it('Should fail to get a transfer', (done) => {
		moip.transfer.getOne('non-existent-id').catch(() => done());
	});

	it('Should successfully get all tranfers', (done) => {
		moip.transfer
			.getAll(moipAccount)
			.then(() => {
				done();
			})
			.catch(done);
	});
});
