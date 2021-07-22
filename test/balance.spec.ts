import auth from './config/auth';
import chai from 'chai';
import connect from '../lib/client/index';

const moip = connect(auth);

chai.should();
chai.use(require('chai-json-schema'));

describe('Balance', () => {
	it('should successfully get balance', (done) => {
		moip.balance
			.getOne()
			.then(({ body }: { body: any }) => {
				body[0].should.have.property('unavailable');
				body[0].should.have.property('future');
				body[0].should.have.property('current');
				done();
			})
			.catch(done);
	});
});
