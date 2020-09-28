const AWS = require('aws-sdk');

const EC2 = new AWS.EC2();

const Instancia = {

    async describeInstances() {

        const data = await EC2.describeInstances().promise();

        return data;
    },

    async describeInstancesById(ID) {

        if (ID.length == 0) {
            throw Error('No hay ID en la data');
        }

        const params = {
            "InstanceIds": ID
        };

        const data = await EC2.describeInstances(params).promise();

        return data;
    },

    async apagar(ID) {

        const params = {
            "InstanceIds": ID
        };

        const data = await EC2.stopInstances(params).promise();

        if (!data) {
            throw Error(`Ocurrió un error al apagar la instancia ${ID}`);
        }

        return data;
    },

    async encender(ID) {

        const params = {
            "InstanceIds": ID
        };

        const data = await EC2.startInstances(params).promise();

        if (!data) {
            throw Error(`Ocurrió un error al encender la instancia ${ID}`);
        }

        return data;
    },

    async describeStatus(ID) {

        const params = {
            // IncludeAllInstances: true,
            InstanceIds: [ID]
        };

        const data = await EC2.describeInstanceStatus(params).promise();

        if (!data) {
            throw Error(`Ocurrió un error al obtener el estado de la ${ID}`);
        }

        return data;
    },

};

module.exports = {
    Instancia
};