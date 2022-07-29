import speakeasy from "speakeasy" 

exports.handler = (event, context, callback) => {

  // Get the request and its headers
  const request = event.Records[0].cf.request;
  const headers = request.headers;

  // const user = <username>;
  // const pw = <password>;
  const secret = <base32secret>;

  const response = {
  status: '401',
  statusDescription: 'Unauthorized',
  body: 'Unauthorized',
  headers: {
    'www-authenticate': [{key: 'WWW-Authenticate', value:'Basic'}]
  },
 };



  if (typeof headers.authorization != 'undefined')
  {
        const authHeader = headers.authorization[0].value;

        const b64auth = (authHeader || '').split(' ')[1] || ''
        const [user, token] = Buffer.from(b64auth, 'base64').toString().split(':')
        // console.log(typeof(user))
        
                  try {
                                   const isValid = speakeasy.totp.verify({
                                      secret: secret,
                                      encoding: 'base32',
                                      token: token,
                      });
                                                            if(isValid && user===<username>){
                                                              callback(null,request);
                                                            }
                                                            else 
                                                                   throw new Error('invalid');
                  } catch (err) {
                                     callback(null, response);
                  }
  }

    callback(null, response);
}












// const token= totp.generate(secret)
// console.log(token)

// try {
//   const isValid = speakeasy.totp.verify({
//     secret: secret,
//     encoding: 'base32',
//     token: <token>,
//     });
//   console.log(isValid)
// } catch (err) {
//                    console.error(err);
// }
  // // Build a Basic Authentication string
  // const authHeader = 'Basic ' + new Buffer(user + ':' + pw).toString('base64');

  // if (authHeader != 'undefined')
  // {
  // // const authHeader = headers.authorization[0].value;

  // const b64auth = (authHeader || '').split(' ')[1] || ''
  // const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':')
  // console.log(user)
  // const isValid = totp.verify({ token, secret });
  // console.log(isValid)
  // }


  
