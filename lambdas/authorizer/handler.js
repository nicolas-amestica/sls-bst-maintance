const jwt = require('jsonwebtoken');

const generatePolicy = (principalId, effect, resource) => {
  const authResponse = {};
  authResponse.principalId = principalId;
  if (effect && resource) {
    const policyDocument = {};
    policyDocument.Version = '2012-10-17';
    policyDocument.Statement = [];
    const statementOne = {};
    statementOne.Action = 'execute-api:Invoke';
    statementOne.Effect = effect;
    statementOne.Resource = resource;
    policyDocument.Statement[0] = statementOne;
    authResponse.policyDocument = policyDocument;
  }
  return authResponse;
}

module.exports.authorizer = (event, context, callback) => {
  
    const token = event.authorizationToken;
  
    if (!token)
      return callback(null, 'No autorizado');
  
    jwt.verify(token, process.env.SEED_TOKEN, (err, decoded) => {
      if (err) {
          console.log(err);
          return callback(null, 'No autorizado');
      }
  
      return callback(null, generatePolicy(decoded.id, 'Allow', event.methodArn));
    });
  
};