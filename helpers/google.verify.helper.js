const {OAuth2Client} = require('google-auth-library');

const clientID = process.env.GOOGLE_CLIENT_ID
const client = new OAuth2Client(clientID);

async function verify() {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: clientID,
  });
  const payload = ticket.getPayload();
  const userid = payload['sub'];
}
verify().catch(console.error);