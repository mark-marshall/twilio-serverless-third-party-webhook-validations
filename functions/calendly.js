const crypto = require('crypto')

exports.handler = function (context, event, callback) {
  // Declare
  const calendlySigningKey = context.CALENDLY_SIGNING_KEY
  const webhookSignature = event.request.headers['calendly-webhook-signature']

  // Get request body without added Twilio Functions params
  const reqBody = { ...event }
  delete reqBody.request
  const stringifiedReqBody = JSON.stringify(reqBody)

  // Parse timestamp and signature from headers
  const [t, signature] = webhookSignature.split(',').map(tS => tS.split('=')[1])

  // Package data for hashing
  const data = `${t}.${stringifiedReqBody}`

  const expectedSignature = crypto
    .createHmac('sha256', calendlySigningKey)
    .update(data, 'utf8')
    .digest('hex')

  // Check if webhook has valid signature
  if (expectedSignature !== signature) {
    console.error('=== INVALID WEBHOOK ===')
  } else {
    console.log('=== VALID WEBHOOK ===')
  }

  callback(null, { hello: 'world' })
}
