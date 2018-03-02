const auth = require('./config/auth')
const basicAuth = require('./config/basicAuth')
let moip = require('../index').default(auth)
const chai = require('chai')

chai.should()
chai.use(require('chai-json-schema'))

describe('Moip Connect', function () {
  const scopes = ['TRANSFER_FUNDS', 'MANAGE_ACCOUNT_INFO', 'REFUND']
  const clientId = 'APP-7K1SKMMQKEQY'
  const redirectUri = 'http://www.moip.com.br/blablabla'
  const clientSecret = '2f23f250c7054d42b4a228e9d290c2ca'

  it('Successfully redirect user to authorization page', (done) => {
    moip.connect.getAuthorizeUrl({
      clientId: clientId,
      redirectUri: redirectUri,
      scopes: scopes
    }).then((url) => {
      console.log(url)
      url.should.be.a('string')
      chai.assert.include(url, `?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.toString()}`)
      chai.assert.include(url, scopes.toString())
      chai.assert.include(url, clientId)
      chai.assert.include(url, redirectUri)
      done()
    }).catch(done)
  })

  it('Return an error when missing redirect_uri', (done) => {
    moip.connect.getAuthorizeUrl({
      clientId: clientId,
      scopes: scopes
    }).catch(() => done())
  })

  it('Return an error when missing client_id', (done) => {
    moip.connect.getAuthorizeUrl({
      redirectUri: redirectUri,
      scopes: scopes
    }).catch(() => done())
  })

  it('Return an error when missing scopes', (done) => {
    moip.connect.getAuthorizeUrl({
      clientId: clientId,
      redirectUri: redirectUri
    }).catch(() => done())
  })

  /*
      This test needs to be properly written as the code is only valid for one request.
   */
  it('Successfully generate an access token', (done) => {
    moip = require('../index').default(basicAuth)
    moip.connect.generateToken({
      clientId: clientId,
      redirectUri: redirectUri,
      clientSecret: clientSecret,
      grantType: 'authorization_code',
      code: 'e5b9510207b82b70dbca3e016cbbac187819b23c'
    }).then((body) => {
      chai.assert.exists(body)
      done()
    })
  })
})
