import auth from './config/auth';
import chai from 'chai';
import accountModel from './schemas/account';
import connect from '../lib/client/index';
const generateCPF = require('gerar-cpf');

const moip = connect(auth);

chai.should();
chai.use(require('chai-json-schema'));

describe('Account', () => {
	before((done) => {
		accountModel.person.taxDocument.number = generateCPF();
		done();
	});

	it('Should successfully create an account', (done) => {
		moip.account
			.create(accountModel)
			.then((response: any) => {
				response.statusCode.should.be.eql(201);
				done();
			})
			.catch((err: any) => {
				done(err.statusCode);
			});
	});

	it('Should successfully verify that an account exists', (done) => {
		moip.account
			.exists({ email: 'integracao@labs.moip.com.br' })
			.then((response: any) => {
				response.statusCode.should.be.eql(200);
				done();
			})
			.catch((err: any) => {
				done(err.statusCode);
			});
	});

	it('Should successfully verify that an account does not exists', (done) => {
		moip.account
			.exists({ email: `integracao${Date.now()}@labs.moip.com.br` })
			.then(() => {
				done('API response did not error, should have returned 404');
			})
			.catch((response: any) => {
				response.statusCode.should.be.eql(404);
				done();
			});
	});
});
