import chai from 'chai';
import bankAccountModel from './schemas/bankAccount';
import connect from '../lib/client/index';
import auth from './config/auth';

const moip = connect(auth);

chai.should();
chai.use(require('chai-json-schema'));

const moipAccount = 'MPA-CULBBYHD11';
let bankAccountID: string;

describe('Bank Account', () => {
	it('Should successfully create a bank account', (done) => {
		moip.bankAccount
			.create(moipAccount, bankAccountModel)
			.then(({ body }: { body: any }) => {
				body.should.have.property('id');
				bankAccountID = body.id;
				done();
			})
			.catch(done);
	});

	it('Should successfully get one bank account', (done) => {
		moip.bankAccount
			.getOne(bankAccountID)
			.then(({ body }: { body: any }) => {
				body.should.have.property('id');
				done();
			})
			.catch(done);
	});

	it('Should fail to get a bank account', (done) => {
		moip.bankAccount.getOne('non-existent-id').catch(() => done());
	});

	it('Should successfully get all bank accounts', (done) => {
		moip.bankAccount
			.getAll(moipAccount)
			.then(() => {
				done();
			})
			.catch(done);
	});

	it('Should successfully delete a bank account', (done) => {
		moip.bankAccount
			.remove(bankAccountID)
			.then(() => {
				done();
			})
			.catch(done);
	});
});
