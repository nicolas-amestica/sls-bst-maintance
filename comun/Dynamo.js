const AWS = require('aws-sdk');

const documentClient = new AWS.DynamoDB.DocumentClient();

const Dynamo = {

    async get(ID, TableName) {

        const params = {
            TableName,
            Key: {
                ID,
            },
        };

        const data = await documentClient.get(params).promise();

        return data;
    },

    async write(data, TableName) {

        if (!data.ID) {
            throw Error('No hay ID en la data');
        }

        const params = {
            TableName,
            Item: data,
        };

        const res = await documentClient.put(params).promise();

        if (!res) {
            throw Error(`Ocurrió un error insertando el ID ${data.ID} en tabla ${TableName}`);
        }

        return data;
    },

    update: async ({ tableName, primaryKey, primaryKeyValue, updateKey, updateValue }) => {

        const params = {
            TableName: tableName,
            Key: { [primaryKey]: primaryKeyValue },
            UpdateExpression: `set ${updateKey} = :updateValue`,
            ConditionExpression: 'attribute_exists(ID)',
            ExpressionAttributeValues: {
                ':updateValue': updateValue,
            },
            ReturnValues: "ALL_NEW"
        };

        return documentClient.update(params).promise();
    },

    query: async ({ tableName, index, queryKey, queryValue }) => {

        const params = {
            TableName: tableName,
            IndexName: index,
            KeyConditionExpression: `${queryKey} = :hkey`,
            ExpressionAttributeValues: {
                ':hkey': queryValue,
            },
        };

        const res = await documentClient.query(params).promise();

        return res || [];
    },

    scan: async ({ tableName, projectionExpression, filterExpression, expressionAttributes }) => {

        const params = {
            TableName: tableName,
            ProjectionExpression: projectionExpression,
            FilterExpression: filterExpression,
            ExpressionAttributeValues: expressionAttributes,
        };

        const res = await documentClient.scan(params).promise();

        return res || [];
    },

};

module.exports = {
    Dynamo
};