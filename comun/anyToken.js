const { Dynamo } = require('./Dynamo');
const tokenTableName = process.env.TABLE_AUTH;

exports.handler = async event => {
    console.log('event', event);

    const tokenID =
        (event.headers &&
            (event.headers['X-Amz-Security-Token'] || event.headers['x-amz-security-token'])) ||
        event.authorizationToken;

    // console.log(tokenID);

    if (!tokenID) {
        console.log('No se ha encontrado el token en el evento');
        return generatePolicy({ allow: false });
    }
    try {
        const token = await Dynamo.get(tokenID, tokenTableName);

        console.log(token);

        if (!token) {
            console.log(`no token for token ID of ${tokenID}`);
            return generatePolicy({ allow: false });
        }

        if (token.expiryDate && token.expiryDate < Date.now()) {
            console.log('after expiry date');
            return generatePolicy({ allow: false });
        }

        return generatePolicy({ allow: true });
    } catch (error) {
        console.log('error ', error);
        return generatePolicy({ allow: false });
    }
};

const generatePolicy = ({ allow }) => {
    return {
        principalId: 'token',
        policyDocument: {
            Version: '2012-10-17',
            Statement: {
                Action: 'execute-api:Invoke',
                Effect: allow ? 'Allow' : 'Deny',
                Resource: '*',
            },
        },
    };
};
